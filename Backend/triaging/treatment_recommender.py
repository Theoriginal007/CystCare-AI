import joblib
import pandas as pd

# Load model
treatment_model = joblib.load("triaging/models/treatment_model.pkl")

# Define label mapping manually
TREATMENT_MAP = {
    0: "Observation",
    1: "Medication",
    2: "Referral",
    3: "Surgery"
}

# Load static data
resource_df = pd.read_csv("data/Resources_Inventory.csv")
cost_df = pd.read_csv("data/Treatment_Costs.csv")

def recommend_treatment(input_dict):
    try:
        # Prepare model input
        model_input = pd.DataFrame([{
            "age": input_dict["age"],
            "menopause_status": input_dict["menopause_status"],
            "cyst_size": input_dict["cyst_size"],
            "cyst_growth_rate": input_dict["cyst_growth_rate"],
            "ca_125_level": input_dict["ca_125_level"],
            "ultrasound_features": input_dict["ultrasound_features"],
            "reported_symptoms": input_dict["reported_symptoms"]
        }])

        # Predict and map to treatment label
        prediction_encoded = treatment_model.predict(model_input)[0]
        treatment = TREATMENT_MAP.get(prediction_encoded, "Unknown")

        # Check availability
        region = input_dict["region"]
        facility = input_dict["facility"]

        available = resource_df[
            (resource_df["region"].str.lower() == region.lower()) &
            (resource_df["facility"].str.lower() == facility.lower()) &
            (resource_df["category"].str.lower() == treatment.lower()) &
            (resource_df["available stock"] > 0)
        ]

        is_available = not available.empty

        # Cost calculation
        cost_info = cost_df[
            (cost_df["region"].str.lower() == region.lower()) &
            (cost_df["facility"].str.lower() == facility.lower()) &
            (cost_df["category"].str.lower() == treatment.lower())
        ]

        if cost_info.empty:
            cost = {"error": "Cost data not available for this facility/treatment"}
        else:
            row = cost_info.iloc[0]
            cost = {
                "base_cost": row["base cost"],
                "nhif": row["NHIF covered"],
                "co_pay": row["insurance co-pay"] if input_dict.get("has_insurance") else 0,
                "out_of_pocket": row["out of pocket"] if not input_dict.get("has_insurance") else 0
            }

        return {
            "recommended_treatment": treatment,
            "available": is_available,
            "cost_breakdown": cost
        }

    except Exception as e:
        raise ValueError(f"Treatment recommendation error: {str(e)}")
