# pinecone_db/ingest.py

import os
import fitz  # PyMuPDF
from pinecone_db.query import upsert_text  # assuming you define this in query.py

DOCUMENTS_DIR = "documents"

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text

def chunk_text(text, max_tokens=300):
    sentences = text.split(". ")
    chunks, chunk = [], ""
    for sentence in sentences:
        if len(chunk) + len(sentence) < max_tokens:
            chunk += sentence + ". "
        else:
            chunks.append(chunk.strip())
            chunk = sentence + ". "
    if chunk:
        chunks.append(chunk.strip())
    return chunks

def ingest_documents():
    for filename in os.listdir(DOCUMENTS_DIR):
        if filename.endswith(".pdf"):
            file_path = os.path.join(DOCUMENTS_DIR, filename)
            print(f"📄 Processing: {filename}")
            text = extract_text_from_pdf(file_path)
            chunks = chunk_text(text)

            for i, chunk in enumerate(chunks):
                print(f"  ➤ Ingesting chunk {i+1}/{len(chunks)}")
                upsert_text(chunk, metadata={"source": filename, "chunk": i})

if __name__ == "__main__":
    ingest_documents()