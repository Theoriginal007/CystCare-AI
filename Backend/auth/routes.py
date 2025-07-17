from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class DoctorLogin(BaseModel):
    license_id: str
    password: str  # simple hash later

verified_licenses = {
    "KEN-MD-1234": "securepass",  # Example license
}

@router.post("/login")
def doctor_login(payload: DoctorLogin):
    if payload.license_id in verified_licenses and verified_licenses[payload.license_id] == payload.password:
        return {"status": "success", "message": "Logged in"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
