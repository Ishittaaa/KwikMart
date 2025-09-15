import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_database():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    
    print("=== CHECKING KWIKMART DATABASE ===\n")
    
    # Check collections
    collections = await database.list_collection_names()
    print(f"Collections found: {collections}\n")
    
    # Check users collection
    users_collection = database.users
    user_count = await users_collection.count_documents({})
    print(f"USERS COLLECTION: {user_count} documents")
    
    if user_count > 0:
        print("Users:")
        async for user in users_collection.find({}, {"password": 0}):  # Exclude password
            print(f"  - {user.get('name', 'No Name')} ({user.get('email', 'No Email')}) - Role: {user.get('role', 'user')}")
    print()
    
    # Check products collection
    products_collection = database.products
    product_count = await products_collection.count_documents({})
    print(f"PRODUCTS COLLECTION: {product_count} documents")
    
    if product_count > 0:
        print("Products:")
        async for product in products_collection.find({}).limit(10):
            print(f"  - {product.get('name', 'No Name')} - Rs.{product.get('price', 0)} - Category: {product.get('category', 'No Category')}")
    else:
        print("  No products found in database!")
    print()
    
    # Check orders collection
    orders_collection = database.orders
    order_count = await orders_collection.count_documents({})
    print(f"ORDERS COLLECTION: {order_count} documents")
    print()
    
    # Check wishlists collection
    wishlists_collection = database.wishlists
    wishlist_count = await wishlists_collection.count_documents({})
    print(f"WISHLISTS COLLECTION: {wishlist_count} documents")
    print()
    
    print("=== DATABASE CHECK COMPLETE ===")

if __name__ == "__main__":
    asyncio.run(check_database())