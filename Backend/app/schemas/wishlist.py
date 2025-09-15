from pydantic import BaseModel
from typing import List
from datetime import datetime

class WishlistAdd(BaseModel):
    product_id: str

class WishlistResponse(BaseModel):
    id: str
    user_id: str
    products: List[str]
    created_at: datetime
    updated_at: datetime