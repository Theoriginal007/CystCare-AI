import joblib
import pandas as pd

model = joblib.load("triaging/models/growth_model.pkl")

def predict_growth(input_dict):
    try:
        df = pd.DataFrame([input_dict])
        # You might need encoding/imputation here if your model expects it
        prediction = model.predict(df)[0]
        return round(prediction, 2)
    except Exception as e:
        raise ValueError(f"Prediction error: {str(e)}")
