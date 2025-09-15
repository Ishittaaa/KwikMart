from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=dict)
async def register(user: UserCreate):
    try:
        result = await AuthService.register_user(user)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    try:
        result = await AuthService.login_user(user)
        return result
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))