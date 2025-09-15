from typing import List, Optional, Dict, Any
from app.repositories.product_repo import ProductRepository
from app.schemas.product import ProductResponse

class ProductService:
    
    @staticmethod
    async def get_products(category: str = None, search: str = None, limit: int = 50) -> List[Dict[str, Any]]:
        products = await ProductRepository.get_all_products(limit, category, search)
        
        # Convert _id to id for response
        for product in products:
            product["id"] = product.pop("_id")
        
        return products
    
    @staticmethod
    async def get_featured_products() -> List[Dict[str, Any]]:
        products = await ProductRepository.get_featured_products()
        
        # Convert _id to id for response
        for product in products:
            product["id"] = product.pop("_id")
        
        return products
    
    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[Dict[str, Any]]:
        product = await ProductRepository.get_product_by_id(product_id)
        
        if product:
            product["id"] = product.pop("_id")
        
        return product
    
    @staticmethod
    async def get_categories() -> Dict[str, List[str]]:
        categories = await ProductRepository.get_categories()
        return {"categories": categories}