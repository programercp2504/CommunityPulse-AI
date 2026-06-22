import os
from app.config import settings

def generate_text(prompt: str, fallback: str):
    try:
        from google import genai

        project = os.getenv("GOOGLE_CLOUD_PROJECT", "communitypulse-ai")
        location = os.getenv("GOOGLE_CLOUD_LOCATION", "global")
        model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

        client = genai.Client(
            vertexai=True,
            project=project,
            location=location
        )

        response = client.models.generate_content(
            model=model_name,
            contents=prompt
        )

        return response.text or fallback

    except Exception as e:
        return fallback + f"\n\n[Gemini fallback active: {str(e)}]"


def health_narrative(ward_name: str, metric: dict, score: int):
    fallback = (
        f"{ward_name} has a health score of {score}/100. "
        f"The main drivers are AQI {metric['air_quality_index']}, "
        f"traffic index {metric['traffic_index']}, and "
        f"{metric['complaint_count']} complaints. Priority should be given "
        f"to reducing traffic bottlenecks and resolving high-impact complaints."
    )

    prompt = f"""
You are CommunityPulse AI.
Explain in 3 simple sentences why this community health score is {score}/100.

Ward: {ward_name}
Metric data: {metric}

Keep the answer practical for city officials.
"""

    return generate_text(prompt, fallback)


def complaint_analysis(description: str):
    desc = description.lower()

    if any(w in desc for w in ["garbage", "waste", "dirty", "drain"]):
        cat, sev = "sanitation", "high"
    elif any(w in desc for w in ["pothole", "road", "bridge"]):
        cat, sev = "infrastructure", "high"
    elif any(w in desc for w in ["traffic", "signal", "jam"]):
        cat, sev = "traffic", "medium"
    elif any(w in desc for w in ["water", "pipe", "supply"]):
        cat, sev = "water", "medium"
    else:
        cat, sev = "general", "medium"

    fallback = (
        f"Category: {cat}. Severity: {sev}. "
        "This complaint should be routed to the responsible department and tracked until closure."
    )

    prompt = f"""
Analyze this citizen complaint for a civic operations dashboard.

Complaint:
{description}

Return:
1. Category
2. Severity
3. Responsible department
4. Short action plan
5. Expected community impact
"""

    narrative = generate_text(prompt, fallback)

    return {
        "category": cat,
        "severity": sev,
        "analysis": narrative
    }


def recommendations(ward_name: str, metric: dict):
    fallback = [
        {
            "title": "Fix top complaint clusters",
            "priority": "High",
            "impact": "+8",
            "department": "Municipal Operations",
            "reason": "Complaint volume is directly lowering the health score."
        },
        {
            "title": "Optimize traffic signals",
            "priority": "High",
            "impact": "+6",
            "department": "Traffic Department",
            "reason": "Traffic index is high and affects commute reliability."
        },
        {
            "title": "Targeted sanitation drive",
            "priority": "Medium",
            "impact": "+5",
            "department": "Sanitation",
            "reason": "Visible local action improves citizen satisfaction quickly."
        }
    ]

    prompt = f"""
You are CommunityPulse AI.
Generate 3 practical recommendations for improving this ward.

Ward: {ward_name}
Metric data: {metric}

Return concise action recommendations with priority, department, reason and projected impact.
"""

    _ = generate_text(prompt, "fallback")
    return fallback