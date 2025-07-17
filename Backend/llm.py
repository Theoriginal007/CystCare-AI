from fastapi import APIRouter
from pydantic import BaseModel
from pinecone_db.query import query_pinecone

router = APIRouter()

class ChatRequest(BaseModel):
    Message: str  
@router.post("/")
def chat(request: ChatRequest):
    question = request.Message.strip()
    if not question:
        return {"response": "Please ask a valid question."}

    results = query_pinecone(question)

    if results and results.matches:
        top_match = results.matches[0]
        answer = top_match.metadata.get("text", "Sorry, I couldn’t find an answer.")
    else:
        answer = "Sorry, I couldn’t find an answer."

    return {"response": answer}
