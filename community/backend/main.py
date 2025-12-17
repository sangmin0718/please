from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# ✅ 같은 패키지(community/backend) 안의 community.py에서 router 가져오기
from .community import router as community_router

app = FastAPI(
    title="Please Community API",
    version="0.1.0",
)

# ✅ 현재 파일 기준 경로 고정
BASE_DIR = Path(__file__).resolve().parent

# ----- CORS 설정 -----
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- 라우터 연결 -----
app.include_router(
    community_router,
    prefix="/community",
    tags=["community"],
)

# ----- 업로드 폴더 Static 마운트 -----
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads",
)

@app.get("/")
def read_root():
    return {"message": "Community backend running"}
