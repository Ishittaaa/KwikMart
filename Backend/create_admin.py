import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.auth import get_password_hash
from datetime import datetime

async def create_admin_user():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    users_collection = database.users
    
    # Check if admin already exists
    existing_admin = await users_collection.find_one({"email": "admin@123.com"})
    
    if existing_admin:
        print("Admin user already exists!")
        return
    
    # Create admin user
    admin_data = {
        "name": "Admin",
        "email": "admin@123.com",
        "phone": "+91 9999999999",
        "password": get_password_hash("admin123"),  # Password: admin123
        "role": "admin",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        "join_date": datetime.now(),
        "addresses": [],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    result = await users_collection.insert_one(admin_data)
    print(f"Admin user created successfully with ID: {result.inserted_id}")
    print("Admin credentials:")
    print("Email: admin@123.com")
    print("Password: admin123")

if __name__ == "__main__":
    asyncio.run(create_admin_user())