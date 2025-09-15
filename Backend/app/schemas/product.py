from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    price: float
    original_price: Optional[float] = None
    image: str
    category: str
    pack_size: str
    is_veg: bool = True
    badge: Optional[str] = None
    discount: Optional[int] = None
    stock: int = 0
    description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    image: Optional[str] = None
    category: Optional[str] = None
    pack_size: Optional[str] = None
    is_veg: Optional[bool] = None
    badge: Optional[str] = None
    discount: Optional[int] = None
    stock: Optional[int] = None
    description: Optional[str] = None

class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime