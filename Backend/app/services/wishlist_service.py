from typing import Optional, Dict, Any
from app.repositories.wishlist_repo import WishlistRepository

class WishlistService:
    
    @staticmethod
    async def add_to_wishlist(user_id: str, product_id: str) -> Dict[str, str]:
        success = await WishlistRepository.add_to_wishlist(user_id, product_id)
        
        if not success:
            raise ValueError("Failed to add product to wishlist")
        
        return {"message": "Product added to wishlist"}
    
    @staticmethod
    async def remove_from_wishlist(user_id: str, product_id: str) -> Dict[str, str]:
        success = await WishlistRepository.remove_from_wishlist(user_id, product_id)
        
        if not success:
            raise ValueError("Product not found in wishlist")
        
        return {"message": "Product removed from wishlist"}
    
    @staticmethod
    async def get_user_wishlist(user_id: str) -> Optional[Dict[str, Any]]:
        wishlist = await WishlistRepository.get_user_wishlist(user_id)
        
        if wishlist:
            wishlist["id"] = wishlist.pop("_id")
        
        return wishlist