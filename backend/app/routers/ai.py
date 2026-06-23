from fastapi import APIRouter
from pydantic import BaseModel
from app.services.data_store import list_wards, list_complaints
from app.services.gemini import generate_text

router = APIRouter(tags=["ai"])

class ChatIn(BaseModel):
    question: str

class WhatIfIn(BaseModel):
    ward_id: str = "W003"
    reduce_complaints: int = 10
    reduce_traffic: int = 10
    improve_air_quality: int = 10

def enrich_ward(w):
    latest = w["metrics"][-1]
    aqi = latest["air_quality_index"]
    traffic = latest["traffic_index"]
    complaints = latest["complaint_count"]

    score = round(
        100
        - (aqi * 0.25)
        - (traffic * 0.25)
        - (complaints * 0.6)
    )
    score = max(0, min(100, score))

    return {**w, "latest_metric": latest, "health_score": score}
def build_city_context():
    wards = [enrich_ward(w) for w in list_wards()]
    complaints = list_complaints()[:8]
    return {
        "wards": wards,
        "complaints": complaints,
        "summary": {
            "lowest_score_ward": min(wards, key=lambda w: w["health_score"]),
            "highest_score_ward": max(wards, key=lambda w: w["health_score"]),
            "total_complaints": sum(w["latest_metric"]["complaint_count"] for w in wards)
        }
    }

@router.post("/assistant/chat")
def chat(payload: ChatIn):
    context = build_city_context()
    lowest = context["summary"]["lowest_score_ward"]

    fallback = f"""
CommunityPulse AI Analysis:

1. Direct answer:
The most at-risk ward is {lowest['name']} with a health score of {lowest['health_score']}/100.

2. Evidence from ward data:
AQI is {lowest['latest_metric']['air_quality_index']}, traffic index is {lowest['latest_metric']['traffic_index']}, and complaints are {lowest['latest_metric']['complaint_count']}.

3. Recommended action:
Resolve high-volume complaint clusters first, especially sanitation, road, and traffic issues.

4. Expected impact:
Reducing complaints and traffic together can improve the score by about 8 to 16 points.

5. Simple explanation:
This ward needs priority because multiple civic stress factors are active together.
"""

    prompt = f"""
You are CommunityPulse AI, a civic decision intelligence assistant.

Use only this data:
{context}

Question:
{payload.question}

Answer with:
1. Direct answer
2. Evidence
3. Recommended action
4. Expected impact
5. Simple explanation
"""

    return {"answer": generate_text(prompt, fallback)}

@router.post("/assistant/what-if")
def what_if(payload: WhatIfIn):
    wards = [enrich_ward(w) for w in list_wards()]
    ward = next((w for w in wards if w["ward_id"] == payload.ward_id), wards[0])

    current = ward["health_score"]
    improvement = round(
        payload.reduce_complaints * 0.35 +
        payload.reduce_traffic * 0.30 +
        payload.improve_air_quality * 0.35
    )
    projected = min(100, current + improvement)

    return {
        "ward": ward["name"],
        "current_score": current,
        "projected_score": projected,
        "improvement": projected - current,
        "recommendation": "Focus first on complaint resolution, traffic control and targeted air-quality interventions."
    }

@router.get("/assistant/report")
def city_report():
    context = build_city_context()
    lowest = context["summary"]["lowest_score_ward"]

    return {
        "title": "CommunityPulse AI Weekly Civic Intelligence Report",
        "summary": f"{lowest['name']} needs highest attention with a health score of {lowest['health_score']}/100.",
        "top_issues": ["High complaint volume", "Traffic congestion", "Air quality pressure"],
        "recommended_actions": [
            "Resolve top complaint clusters within 72 hours",
            "Deploy sanitation and road-repair teams in low-score wards",
            "Optimize traffic signals during peak hours"
        ],
        "expected_impact": "Estimated 8 to 16 point improvement in health score if actions are implemented."
    }