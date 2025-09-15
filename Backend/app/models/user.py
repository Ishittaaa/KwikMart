from datetime import datetime
from typing import List, Dict, Any

class UserModel:
    """Database model for User collection"""
    
    @staticmethod
    def create_user_document(name: str, email: str, phone: str, password_hash: str) -> Dict[str, Any]:
        return {
            "name": name,
            "email": email,
            "phone": phone,
            "password": password_hash,
            "role": "user",
            "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            "join_date": datetime.now(),
            "addresses": [],
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    
    @staticmethod
    def update_user_document(update_data: Dict[str, Any]) -> Dict[str, Any]:
        update_data["updated_at"] = datetime.now()
        return {"$set": update_data}