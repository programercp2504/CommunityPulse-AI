from app.config import settings

try:
    import google.generativeai as genai
except Exception:
    genai = None

def _model():
    if not settings.gemini_api_key or genai is None:
        return None
    genai.configure(api_key=settings.gemini_api_key)
    return genai.GenerativeModel("gemini-1.5-flash")

def generate_text(prompt: str, fallback: str):
    model = _model()
    if not model:
        return fallback
    try:
        res = model.generate_content(prompt)
        return res.text or fallback
    except Exception:
        return fallback

def health_narrative(ward_name: str, metric: dict, score: int):
    fallback = f"{ward_name} has a health score of {score}/100. The main drivers are AQI {metric['air_quality_index']}, traffic index {metric['traffic_index']}, and {metric['complaint_count']} complaints. Priority should be given to reducing traffic bottlenecks and resolving high-impact complaints."
    prompt = f"Explain in 3 simple sentences why this community health score is {score}/100 for {ward_name}. Use only this data: {metric}"
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
    fallback = f"Category: {cat}. Severity: {sev}. This complaint should be routed to the responsible department and tracked until closure."
    prompt = f"Analyze this citizen complaint. Return category, severity, responsible department, and short action plan: {description}"
    narrative = generate_text(prompt, fallback)
    return {"category": cat, "severity": sev, "analysis": narrative}

def recommendations(ward_name: str, metric: dict):
    fallback = [
        {"title":"Fix top complaint clusters", "priority":"High", "impact":"+8", "department":"Municipal Operations", "reason":"Complaint volume is directly lowering the health score."},
        {"title":"Optimize traffic signals", "priority":"High", "impact":"+6", "department":"Traffic Department", "reason":"Traffic index is high and affects commute reliability."},
        {"title":"Targeted sanitation drive", "priority":"Medium", "impact":"+5", "department":"Sanitation", "reason":"Visible local action improves citizen satisfaction quickly."}
    ]
    return fallback
