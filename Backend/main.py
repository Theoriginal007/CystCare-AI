from fastapi import FastAPI

# Import routers
from auth.routes import router as auth_router
from triaging.routes import router as triaging_router
from llm import router as chatbot_router
from payments.mpesa import router as payments_router
from pinecone_db.query import router as pinecone_router
from clinics.google import router as clinics_router

app = FastAPI(title="GROOT")

# Include routers with prefixes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(triaging_router, prefix="/triage", tags=["Triaging"])
app.include_router(chatbot_router, prefix="/chat", tags=["Chatbot"])
app.include_router(payments_router, prefix="/payments", tags=["Payments"])
app.include_router(pinecone_router, prefix="/pinecone", tags=["Pinecone DB"])
app.include_router(clinics_router, prefix="/clinics", tags=["Clinics"])

@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to GROOT, AI platform for Ovarian Cyst Management"}

