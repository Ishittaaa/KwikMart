import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

async def debug_admin_login():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    users_collection = database.users
    
    print("=== DEBUGGING ADMIN LOGIN ===\n")
    
    # 1. Check if admin user exists
    admin_user = await users_collection.find_one({"email": "admin@123.com"})
    
    if not admin_user:
        print("[ERROR] Admin user NOT found in database!")
        print("Creating admin user...")
        
        # Create password context
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        
        # Create admin user
        from datetime import datetime
        admin_data = {
            "name": "Admin",
            "email": "admin@123.com",
            "phone": "+91 9999999999",
            "password": pwd_context.hash("admin123"),  # Use admin123 as password
            "role": "admin",
            "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            "join_date": datetime.now(),
            "addresses": [],
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        
        result = await users_collection.insert_one(admin_data)
        print(f"[SUCCESS] Admin user created with ID: {result.inserted_id}")
        admin_user = await users_collection.find_one({"email": "admin@123.com"})
    
    print("[SUCCESS] Admin user found in database")
    print(f"Name: {admin_user['name']}")
    print(f"Email: {admin_user['email']}")
    print(f"Role: {admin_user['role']}")
    
    # 2. Test password verification
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    test_passwords = ["admin", "admin123", "password"]
    
    print(f"\n=== TESTING PASSWORDS ===")
    for test_pwd in test_passwords:
        try:
            is_valid = pwd_context.verify(test_pwd, admin_user['password'])
            if is_valid:
                print(f"[SUCCESS] Password '{test_pwd}' is CORRECT!")
                print(f"\nUSE THESE CREDENTIALS:")
                print(f"Email: admin@123.com")
                print(f"Password: {test_pwd}")
                return
            else:
                print(f"[FAIL] Password '{test_pwd}' is incorrect")
        except Exception as e:
            print(f"[ERROR] Error testing password '{test_pwd}': {e}")
    
    print("\n[ERROR] None of the test passwords work!")
    print("Resetting admin password to 'admin123'...")
    
    # Reset password
    new_password_hash = pwd_context.hash("admin123")
    await users_collection.update_one(
        {"email": "admin@123.com"},
        {"$set": {"password": new_password_hash}}
    )
    
    print("[SUCCESS] Password reset complete!")
    print("\nUSE THESE CREDENTIALS:")
    print("Email: admin@123.com")
    print("Password: admin123")

if __name__ == "__main__":
    asyncio.run(debug_admin_login())