# pinecone_db/query.py

import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

load_dotenv()

# Setup OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Setup Pinecone (new v3 API)
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Create index if it doesn't exist
index_name = "ovarian-cyst-index"

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1024,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-west-2"
        )
    )

index = pc.Index(index_name)

# --- EMBEDDING + VECTOR FUNCTIONS ---

def embed_text(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=[text]
    )
    return response.data[0].embedding

def upsert_text(text, metadata={}):
    embedding = embed_text(text)
    vector = {
        "id": str(hash(text)),
        "values": embedding,
        "metadata": metadata
    }
    index.upsert(vectors=[vector])

def query_pinecone(query_text, top_k=5):
    query_embedding = embed_text(query_text)
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    return results

# --- FASTAPI ROUTER SETUP ---

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    top_k: int = 5

@router.post("/search")
def search_vectors(request: QueryRequest):
    try:
        results = query_pinecone(request.query, top_k=request.top_k)
        return {
            "matches": results["matches"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
