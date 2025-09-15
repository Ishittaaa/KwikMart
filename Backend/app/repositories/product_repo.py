from typing import List, Optional, Dict, Any
from bson import ObjectId
from app.database import products_collection
from app.models.product import ProductModel
from app.utils.helpers import object_id_to_str

class ProductRepository:
    
    @staticmethod
    async def get_all_products(limit: int = 50, category: str = None, search: str = None) -> List[Dict[str, Any]]:
        query = {}
        
        if category:
            query["category"] = category
        
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"category": {"$regex": search, "$options": "i"}}
            ]
        
        cursor = products_collection.find(query).limit(limit)
        products = await cursor.to_list(length=limit)
        
        return [object_id_to_str(product) for product in products]
    
    @staticmethod
    async def get_featured_products(limit: int = 6) -> List[Dict[str, Any]]:
        cursor = products_collection.find({"badge": {"$exists": True}}).limit(limit)
        products = await cursor.to_list(length=limit)
        
        return [object_id_to_str(product) for product in products]
    
    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[Dict[str, Any]]:
        try:
            product = await products_collection.find_one({"_id": ObjectId(product_id)})
            return object_id_to_str(product) if product else None
        except:
            return None
    
    @staticmethod
    async def get_categories() -> List[str]:
        return await products_collection.distinct("category")
    
    @staticmethod
    async def create_product(product_data: Dict[str, Any]) -> Dict[str, Any]:
        product_doc = ProductModel.create_product_document(product_data)
        result = await products_collection.insert_one(product_doc)
        product_doc["_id"] = result.inserted_id
        return object_id_to_str(product_doc)