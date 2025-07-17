from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from triaging.growth_predictor import predict_growth
from triaging.treatment_recommender import recommend_treatment

router = APIRouter()

class PatientData(BaseModel):
    age: int
    menopause_status: str
    cyst_size: float
    cyst_growth_rate: float
    ca_125_level: float
    ultrasound_features: str
    reported_symptoms: str
    region: str
    facility: str
    has_insurance: bool

@router.post("/growth")
def growth(payload: PatientData):
    try:
        prediction = predict_growth(payload.dict())
        return {"predicted_growth": prediction}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/recommendation")
def recommend(payload: PatientData):
    try:
        result = recommend_treatment(payload.dict())
        return result  # includes treatment, availability, cost
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

