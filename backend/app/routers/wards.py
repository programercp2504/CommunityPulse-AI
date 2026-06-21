from fastapi import APIRouter, HTTPException
from app.services.data_store import list_wards, get_ward, latest_metric
from app.services.health_score import calculate_health_score, what_if
from app.services.gemini import health_narrative, recommendations

router = APIRouter(tags=["wards"])

@router.get("/wards")
def wards():
    data = []
    for ward in list_wards():
        metric = ward["metrics"][-1]
        score = calculate_health_score(metric)["score"]
        data.append({"ward_id": ward["ward_id"], "name": ward["name"], "population": ward["population"], "latest_metric": metric, "health_score": score})
    return {"wards": data}

@router.get("/wards/{ward_id}/metrics")
def ward_metrics(ward_id: str):
    ward = get_ward(ward_id)
    if not ward:
        raise HTTPException(404, "Ward not found")
    return ward

@router.get("/wards/{ward_id}/health-score")
def ward_health_score(ward_id: str):
    ward = get_ward(ward_id)
    metric = latest_metric(ward_id)
    if not ward or not metric:
        raise HTTPException(404, "Ward not found")
    result = calculate_health_score(metric)
    return {**result, "ward_id": ward_id, "ward_name": ward["name"], "narrative": health_narrative(ward["name"], metric, result["score"]), "metric": metric}

@router.get("/wards/{ward_id}/recommendations")
def ward_recommendations(ward_id: str):
    ward = get_ward(ward_id)
    metric = latest_metric(ward_id)
    if not ward or not metric:
        raise HTTPException(404, "Ward not found")
    return {"ward_id": ward_id, "ward_name": ward["name"], "recommendations": recommendations(ward["name"], metric)}

@router.get("/wards/{ward_id}/what-if")
def ward_what_if(ward_id: str, complaint_reduction: int = 10, traffic_reduction: int = 10, aqi_reduction: int = 10):
    metric = latest_metric(ward_id)
    if not metric:
        raise HTTPException(404, "Ward not found")
    current = calculate_health_score(metric)
    projected = what_if(metric, complaint_reduction, traffic_reduction, aqi_reduction)
    return {"current": current, "projected": projected, "improvement": projected["score"] - current["score"]}
