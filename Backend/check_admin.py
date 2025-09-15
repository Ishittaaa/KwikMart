import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.auth import verify_password

async def check_admin_user():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    users_collection = database.users
    
    # Find admin user
    admin_user = await users_collection.find_one({"email": "admin@123.com"})
    
    if admin_user:
        print("Admin user found:")
        print(f"Name: {admin_user['name']}")
        print(f"Email: {admin_user['email']}")
        print(f"Role: {admin_user['role']}")
        print(f"Phone: {admin_user['phone']}")
        
        # Test common passwords
        test_passwords = ["admin", "admin123", "password", "123456"]
        
        print("\nTesting passwords:")
        for pwd in test_passwords:
            if verify_password(pwd, admin_user['password']):
                print(f"✅ Password '{pwd}' works!")
                return
        
        print("❌ None of the test passwords work")
        print("The admin user exists but password verification failed")
        
    else:
        print("❌ Admin user not found!")

if __name__ == "__main__":
    asyncio.run(check_admin_user())