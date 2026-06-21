def clamp(value, low=0, high=100):
    return max(low, min(high, round(value)))

def calculate_health_score(metric: dict):
    air_score = 100 - min(metric["air_quality_index"], 150) * 0.55
    traffic_score = 100 - metric["traffic_index"] * 0.65
    complaint_score = 100 - min(metric["complaint_count"], 60) * 1.1
    weather_score = 100 - max(metric["temperature"] - 30, 0) * 3 - max(metric["humidity"] - 65, 0) * 0.8

    weighted = (
        air_score * 0.35 +
        traffic_score * 0.25 +
        complaint_score * 0.25 +
        weather_score * 0.15
    )
    breakdown = {
        "air_quality": clamp(air_score),
        "traffic": clamp(traffic_score),
        "complaints": clamp(complaint_score),
        "weather": clamp(weather_score)
    }
    return {"score": clamp(weighted), "breakdown": breakdown}

def what_if(metric: dict, complaint_reduction: int, traffic_reduction: int, aqi_reduction: int):
    changed = metric.copy()
    changed["complaint_count"] = max(0, changed["complaint_count"] - complaint_reduction)
    changed["traffic_index"] = max(0, changed["traffic_index"] - traffic_reduction)
    changed["air_quality_index"] = max(0, changed["air_quality_index"] - aqi_reduction)
    return calculate_health_score(changed)
