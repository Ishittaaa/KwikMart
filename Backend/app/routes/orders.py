from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order_service import OrderService
from app.utils.dependencies import get_current_user_id

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse)
async def create_order(order: OrderCreate, user_id: str = Depends(get_current_user_id)):
    try:
        print(f"Creating order for user: {user_id}")
        print(f"Order data: {order}")
        created_order = await OrderService.create_order(user_id, order)
        return created_order
    except Exception as e:
        print(f"Order creation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[OrderResponse])
async def get_user_orders(user_id: str = Depends(get_current_user_id)):
    orders = await OrderService.get_user_orders(user_id)
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, user_id: str = Depends(get_current_user_id)):
    order = await OrderService.get_order_by_id(order_id, user_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order