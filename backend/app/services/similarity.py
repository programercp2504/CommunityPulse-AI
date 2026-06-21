def tokens(text: str):
    stop = {"the","is","a","an","for","to","of","in","on","near","and","with","at"}
    return {w.strip(".,!?;:").lower() for w in text.split() if w.lower() not in stop and len(w) > 2}

def similar_complaints(text: str, complaints: list, limit: int = 3):
    source = tokens(text)
    scored = []
    for c in complaints:
        target = tokens(c["description"]) | set(c.get("keywords", []))
        union = len(source | target) or 1
        score = len(source & target) / union
        if score > 0:
            scored.append({**c, "similarity": round(score * 100, 1)})
    return sorted(scored, key=lambda x: x["similarity"], reverse=True)[:limit]
