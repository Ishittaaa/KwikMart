from datetime import datetime
from typing import Dict, Any, Optional

class ProductModel:
    """Database model for Product collection"""
    
    @staticmethod
    def create_product_document(product_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            **product_data,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    
    @staticmethod
    def update_product_document(update_data: Dict[str, Any]) -> Dict[str, Any]:
        update_data["updated_at"] = datetime.now()
        return {"$set": update_data}