from typing import Optional, Dict, Any
from app.repositories.user_repo import UserRepository
from app.utils.auth import verify_password, get_password_hash, create_access_token
from app.schemas.user import UserCreate, UserLogin

class AuthService:
    
    @staticmethod
    async def register_user(user_data: UserCreate) -> Dict[str, Any]:
        # Check if user exists
        existing_user = await UserRepository.find_by_email(user_data.email)
        if existing_user:
            raise ValueError("Email already registered")
        
        # Hash password and create user
        password_hash = get_password_hash(user_data.password)
        user = await UserRepository.create_user(
            user_data.name, 
            user_data.email, 
            user_data.phone, 
            password_hash
        )
        
        # Generate token
        access_token = create_access_token(data={"sub": user_data.email})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "message": "User registered successfully"
        }
    
    @staticmethod
    async def login_user(login_data: UserLogin) -> Dict[str, Any]:
        # Find user
        user = await UserRepository.find_by_email(login_data.email)
        if not user or not verify_password(login_data.password, user["password"]):
            raise ValueError("Invalid credentials")
        
        # Generate token
        access_token = create_access_token(data={"sub": login_data.email})
        
        # Remove password from response
        user_response = {k: v for k, v in user.items() if k != "password"}
        user_response["id"] = user_response.pop("_id")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_response
        }