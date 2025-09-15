from typing import List, Optional, Dict, Any
from bson import ObjectId
from app.database import orders_collection
from app.models.order import OrderModel
from app.utils.helpers import object_id_to_str

class OrderRepository:
    
    @staticmethod
    async def create_order(user_id: str, order_id: str, items: List[Dict], total_amount: float, delivery_address: Dict) -> Dict[str, Any]:
        order_doc = OrderModel.create_order_document(user_id, order_id, items, total_amount, delivery_address)
        result = await orders_collection.insert_one(order_doc)
        order_doc["_id"] = result.inserted_id
        return object_id_to_str(order_doc)
    
    @staticmethod
    async def get_user_orders(user_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        try:
            cursor = orders_collection.find({"user_id": ObjectId(user_id)}).sort("created_at", -1).limit(limit)
            orders = await cursor.to_list(length=limit)
            return [object_id_to_str(order) for order in orders]
        except:
            return []
    
    @staticmethod
    async def get_order_by_id(order_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        try:
            order = await orders_collection.find_one({
                "_id": ObjectId(order_id),
                "user_id": ObjectId(user_id)
            })
            return object_id_to_str(order) if order else None
        except:
            return None
    
    @staticmethod
    async def update_order_status(order_id: str, status: str) -> bool:
        try:
            update_doc = OrderModel.update_order_document({"status": status})
            result = await orders_collection.update_one(
                {"_id": ObjectId(order_id)}, 
                update_doc
            )
            return result.modified_count > 0
        except:
            return False