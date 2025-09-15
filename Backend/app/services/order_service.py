from typing import List, Optional, Dict, Any
from app.repositories.order_repo import OrderRepository
from app.schemas.order import OrderCreate
from app.utils.helpers import generate_order_id

class OrderService:
    
    @staticmethod
    async def create_order(user_id: str, order_data: OrderCreate) -> Dict[str, Any]:
        order_id = generate_order_id()
        items = [item.dict() for item in order_data.items]
        
        order = await OrderRepository.create_order(
            user_id, 
            order_id, 
            items, 
            order_data.total_amount, 
            order_data.delivery_address
        )
        
        # Convert _id to id for response
        order["id"] = order.pop("_id")
        
        return order
    
    @staticmethod
    async def get_user_orders(user_id: str) -> List[Dict[str, Any]]:
        orders = await OrderRepository.get_user_orders(user_id)
        
        # Convert _id to id for response
        for order in orders:
            order["id"] = order.pop("_id")
        
        return orders
    
    @staticmethod
    async def get_order_by_id(order_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        order = await OrderRepository.get_order_by_id(order_id, user_id)
        
        if order:
            order["id"] = order.pop("_id")
        
        return order