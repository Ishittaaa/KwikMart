from typing import Optional, Dict, Any
from bson import ObjectId
from app.database import wishlists_collection
from app.models.wishlist import WishlistModel
from app.utils.helpers import object_id_to_str

class WishlistRepository:
    
    @staticmethod
    async def add_to_wishlist(user_id: str, product_id: str) -> bool:
        try:
            update_doc = WishlistModel.add_product_update(product_id)
            result = await wishlists_collection.update_one(
                {"user_id": ObjectId(user_id)},
                {
                    **update_doc,
                    "$setOnInsert": WishlistModel.create_wishlist_document(user_id)
                },
                upsert=True
            )
            return True
        except:
            return False
    
    @staticmethod
    async def remove_from_wishlist(user_id: str, product_id: str) -> bool:
        try:
            update_doc = WishlistModel.remove_product_update(product_id)
            result = await wishlists_collection.update_one(
                {"user_id": ObjectId(user_id)},
                update_doc
            )
            return result.modified_count > 0
        except:
            return False
    
    @staticmethod
    async def get_user_wishlist(user_id: str) -> Optional[Dict[str, Any]]:
        try:
            wishlist = await wishlists_collection.find_one({"user_id": ObjectId(user_id)})
            if not wishlist:
                # Create empty wishlist
                wishlist_doc = WishlistModel.create_wishlist_document(user_id)
                result = await wishlists_collection.insert_one(wishlist_doc)
                wishlist_doc["_id"] = result.inserted_id
                return object_id_to_str(wishlist_doc)
            
            return object_id_to_str(wishlist)
        except:
            return None