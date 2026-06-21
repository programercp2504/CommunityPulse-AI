import json
from pathlib import Path
from uuid import uuid4
from datetime import datetime, timezone

BASE = Path(__file__).resolve().parents[1] / "data"

with open(BASE / "mock_wards.json", "r", encoding="utf-8") as f:
    WARDS = json.load(f)["wards"]
with open(BASE / "mock_complaints.json", "r", encoding="utf-8") as f:
    COMPLAINTS = json.load(f)["complaints"]

def list_wards():
    return WARDS

def get_ward(ward_id: str):
    return next((w for w in WARDS if w["ward_id"] == ward_id), None)

def latest_metric(ward_id: str):
    ward = get_ward(ward_id)
    if not ward:
        return None
    return ward["metrics"][-1]

def list_complaints():
    return COMPLAINTS

def get_complaint(complaint_id: str):
    return next((c for c in COMPLAINTS if c["complaint_id"] == complaint_id), None)

def add_complaint(ward_id: str, description: str, category: str, severity: str):
    item = {
        "complaint_id": f"C{uuid4().hex[:6].upper()}",
        "ward_id": ward_id,
        "category": category,
        "severity": severity,
        "description": description,
        "status": "open",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "keywords": description.lower().split()[:8]
    }
    COMPLAINTS.insert(0, item)
    return item
