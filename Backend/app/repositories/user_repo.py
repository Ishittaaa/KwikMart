from typing import Optional, Dict, Any
from bson import ObjectId
from app.database import users_collection
from app.models.user import UserModel
from app.utils.helpers import object_id_to_str

class UserRepository:
    
    @staticmethod
    async def create_user(name: str, email: str, phone: str, password_hash: str) -> Dict[str, Any]:
        user_doc = UserModel.create_user_document(name, email, phone, password_hash)
        result = await users_collection.insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        return object_id_to_str(user_doc)
    
    @staticmethod
    async def find_by_email(email: str) -> Optional[Dict[str, Any]]:
        user = await users_collection.find_one({"email": email})
        return object_id_to_str(user) if user else None
    
    @staticmethod
    async def find_by_id(user_id: str) -> Optional[Dict[str, Any]]:
        try:
            user = await users_collection.find_one({"_id": ObjectId(user_id)})
            return object_id_to_str(user) if user else None
        except:
            return None
    
    @staticmethod
    async def update_user(user_id: str, update_data: Dict[str, Any]) -> bool:
        try:
            update_doc = UserModel.update_user_document(update_data)
            result = await users_collection.update_one(
                {"_id": ObjectId(user_id)}, 
                update_doc
            )
            return result.modified_count > 0
        except:
            return False