from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class OrderItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    image: str

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total_amount: float
    delivery_address: Dict[str, Any]

class OrderResponse(BaseModel):
    id: str
    user_id: str
    order_id: str
    items: List[OrderItem]
    total_amount: float
    status: str
    delivery_address: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

class OrderUpdate(BaseModel):
    status: str