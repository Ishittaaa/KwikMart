from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class Address(BaseModel):
    type: str
    address: str
    is_default: bool = False

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    role: str
    avatar: Optional[str] = None
    join_date: datetime
    addresses: List[Address] = []

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None