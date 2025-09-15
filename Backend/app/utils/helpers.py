from bson import ObjectId
from datetime import datetime

def object_id_to_str(obj):
    """Convert ObjectId to string in MongoDB documents"""
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, ObjectId):
                obj[key] = str(value)
            elif isinstance(value, dict):
                object_id_to_str(value)
            elif isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        object_id_to_str(item)
    return obj

def generate_order_id():
    """Generate unique order ID"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"ORD{timestamp}"