from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
from typing import Optional
from datetime import datetime, timezone, timedelta
import json, uuid, time

DB = Path("data.json") # json 저장 위치(현재는 단일 파일)
app = FastAPI(title="CAP Stats JSON")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

def now() -> int: return int(time.time())
TZ_KST = timezone(timedelta(hours=9), name="KST")
def now_kst_iso() -> str: return datetime.now(TZ_KST).isoformat()

def load() -> dict:
    if not DB.exists(): return {"sessions": {}}
    try: return json.loads(DB.read_text())
    except: return {"sessions": {}}

def save(d: dict) -> None: DB.write_text(json.dumps(d, ensure_ascii=False, indent=2))
def spent(s: dict) -> int: return max(0, (s.get("end") or 0) - s.get("start", 0))

def calc_stats(sessions: dict, caseid: Optional[str] = None) -> dict: # 통계 집계(플에이 수 / 클리어 수 / 소요시간 / 평균 소요시간)
    ss = [v for v in sessions.values() if (caseid is None or v.get("caseid")==caseid)]
    ended = [s for s in ss if s.get("end")]
    total = sum(spent(s) for s in ended)
    return {
        "play_count": len(ss),
        "clear_count": sum(1 for s in ended if s.get("cleared") is True),
        "total_time_seconds": total,
        "average_play_time_seconds": (total / len(ended)) if ended else 0.0
    }

class StartIn(BaseModel):
    uid: str
    caseid: str

class EndIn(BaseModel):
    session_id: str
    cleared: bool
    caseid: Optional[str] = None

@app.post("/events/start") # 세션 시작(서버 시각 기록, kst 포함)
def start_session(body: StartIn):
    db = load()
    sid = str(uuid.uuid4())
    session = {
        "uid": body.uid, "caseid": body.caseid,
        "start": now(), "start_kst": now_kst_iso(),
        "end": None, "end_kst": None, "cleared": None
    }
    db["sessions"][sid] = session
    save(db)
    return {"session_id": sid, "started_at_kst": session["start_kst"]}

@app.post("/events/end") # 세션 종료(소요시간, 클리어 여부 기록)
def end_session(body: EndIn):
    db = load()
    s = db["sessions"].get(body.session_id)
    if not s: raise HTTPException(404, "session not found")
    if not s.get("end"):
        s["end"] = now()
        s["end_kst"] = now_kst_iso()
        if body.caseid: s["caseid"] = body.caseid
        s["cleared"] = bool(body.cleared)
        save(db)
    cid = s["caseid"]
    return {
        "session_id": body.session_id,
        "time_spent_seconds": spent(s),
        "started_at_kst": s.get("start_kst"),
        "ended_at_kst": s.get("end_kst"),
        "global_stats": calc_stats(db["sessions"]),
        "scenario_stats": calc_stats(db["sessions"], cid),
        "caseid": cid
    }

@app.get("/stats/global") # 통계 조회
def stats_global():
    return calc_stats(load()["sessions"])

@app.get("/stats/scenario/{caseid}") # 시나리오 별 통계 조회 -> 구현해야함
def stats_scenario(caseid: str):
    return calc_stats(load()["sessions"], caseid)
