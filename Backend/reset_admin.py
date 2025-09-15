import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from datetime import datetime

async def reset_admin_password():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    users_collection = database.users
    
    # Create password context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    # Hash the new password
    new_password = "admin123"
    hashed_password = pwd_context.hash(new_password)
    
    # Update admin user password
    result = await users_collection.update_one(
        {"email": "admin@123.com"},
        {
            "$set": {
                "password": hashed_password,
                "updated_at": datetime.now()
            }
        }
    )
    
    if result.modified_count > 0:
        print("Admin password updated successfully!")
        print("New admin credentials:")
        print("Email: admin@123.com")
        print("Password: admin123")
    else:
        print("Failed to update admin password or admin user not found")

if __name__ == "__main__":
    asyncio.run(reset_admin_password())