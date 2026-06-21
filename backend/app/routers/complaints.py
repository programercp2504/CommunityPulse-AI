from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.data_store import list_complaints, get_complaint, add_complaint
from app.services.similarity import similar_complaints
from app.services.gemini import complaint_analysis

router = APIRouter(tags=["complaints"])

class ComplaintIn(BaseModel):
    ward_id: str
    description: str

@router.get("/complaints")
def complaints():
    return {"complaints": list_complaints()}

@router.get("/complaints/{complaint_id}")
def complaint(complaint_id: str):
    item = get_complaint(complaint_id)
    if not item:
        raise HTTPException(404, "Complaint not found")
    return item

@router.post("/complaints/analyze")
def analyze(payload: ComplaintIn):
    analysis = complaint_analysis(payload.description)
    similar = similar_complaints(payload.description, list_complaints())
    return {"input": payload.model_dump(), "analysis": analysis, "similar_complaints": similar}

@router.post("/complaints")
def create_complaint(payload: ComplaintIn):
    analysis = complaint_analysis(payload.description)
    item = add_complaint(payload.ward_id, payload.description, analysis["category"], analysis["severity"])
    return {"complaint": item, "analysis": analysis}
