from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from datetime import datetime
from base64 import b64encode

router = APIRouter()

# Utility functions
def generate_password(shortcode="174379", passkey="YOUR_PASSKEY"):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    data = shortcode + passkey + timestamp
    return b64encode(data.encode()).decode(), timestamp

def send_stk_push(phone: str, amount: int, access_token: str):
    password, time_stamp = generate_password()
    payload = {
        "BusinessShortCode": "174379",
        "Password": password,
        "Timestamp": time_stamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": "174379",
        "PhoneNumber": phone,
        "CallBackURL": "https://yourdomain.com/payment/callback",  # Replace with your real endpoint
        "AccountReference": "OvarianCyst",
        "TransactionDesc": "Cyst Treatment Payment"
    }
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# Request model for the API endpoint
class STKPushRequest(BaseModel):
    phone: str
    amount: int
    access_token: str

# FastAPI endpoint
@router.post("/stk-push")
def initiate_stk_push(request: STKPushRequest):
    try:
        result = send_stk_push(request.phone, request.amount, request.access_token)
        return {"status": "success", "response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
