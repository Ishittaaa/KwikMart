from datetime import datetime
from typing import Dict, Any
from bson import ObjectId

class WishlistModel:
    """Database model for Wishlist collection"""
    
    @staticmethod
    def create_wishlist_document(user_id: str) -> Dict[str, Any]:
        return {
            "user_id": ObjectId(user_id),
            "products": [],
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    
    @staticmethod
    def add_product_update(product_id: str) -> Dict[str, Any]:
        return {
            "$addToSet": {"products": ObjectId(product_id)},
            "$set": {"updated_at": datetime.now()}
        }
    
    @staticmethod
    def remove_product_update(product_id: str) -> Dict[str, Any]:
        return {
            "$pull": {"products": ObjectId(product_id)},
            "$set": {"updated_at": datetime.now()}
        }