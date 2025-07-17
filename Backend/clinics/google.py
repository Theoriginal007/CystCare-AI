# clinics/google.py

import requests
from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

def get_nearby_clinics(lat: float, lon: float, api_key: str, radius=3000):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lon}",
        "radius": radius,
        "type": "hospital",
        "key": api_key
    }
    res = requests.get(url, params=params)
    return res.json().get("results", [])

@router.get("/nearby")
def nearby_clinics(
    lat: float = Query(..., description="Latitude of user"),
    lon: float = Query(..., description="Longitude of user"),
    radius: int = Query(3000, description="Search radius in meters")
):
    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Google Maps API key not configured")

    try:
        results = get_nearby_clinics(lat, lon, api_key, radius)
        # Optional: reduce clutter in response
        simplified = [
            {
                "name": clinic.get("name"),
                "vicinity": clinic.get("vicinity"),
                "rating": clinic.get("rating"),
                "user_ratings_total": clinic.get("user_ratings_total"),
                "location": clinic.get("geometry", {}).get("location", {})
            }
            for clinic in results
        ]
        return {"clinics": simplified}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
