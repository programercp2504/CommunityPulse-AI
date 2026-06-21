from fastapi import APIRouter
from pydantic import BaseModel
from app.services.data_store import list_wards, list_complaints
from app.services.gemini import generate_text

router = APIRouter(tags=["ai"])

class ChatIn(BaseModel):
    question: str

@router.post("/assistant/chat")
def chat(payload: ChatIn):
    context = {"wards": list_wards(), "complaints": list_complaints()[:5]}
    fallback = "Based on the mock community data, the areas needing attention are high complaint volume, traffic congestion, and air-quality spikes. Use the recommendations page to test score improvements."
    prompt = f"You are CommunityPulse AI. Answer the user using only this data: {context}. User question: {payload.question}"
    return {"answer": generate_text(prompt, fallback)}
