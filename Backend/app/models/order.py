from datetime import datetime
from typing import List, Dict, Any
from bson import ObjectId

class OrderModel:
    """Database model for Order collection"""
    
    @staticmethod
    def create_order_document(user_id: str, order_id: str, items: List[Dict], total_amount: float, delivery_address: Dict) -> Dict[str, Any]:
        return {
            "user_id": ObjectId(user_id),
            "order_id": order_id,
            "items": items,
            "total_amount": total_amount,
            "status": "pending",
            "delivery_address": delivery_address,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    
    @staticmethod
    def update_order_document(update_data: Dict[str, Any]) -> Dict[str, Any]:
        update_data["updated_at"] = datetime.now()
        return {"$set": update_data}