import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

async def add_sample_products():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017/kwikmart")
    database = client.kwikmart
    products_collection = database.products
    
    # Check if products already exist
    existing_count = await products_collection.count_documents({})
    if existing_count > 0:
        print(f"Products already exist ({existing_count} products found)")
        return
    
    # Sample products data
    sample_products = [
        {
            "name": "Fresh Red Apples",
            "price": 120,
            "original_price": 160,
            "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300",
            "category": "Fruits & Vegetables",
            "pack_size": "1 kg Pack",
            "is_veg": True,
            "badge": "Fresh",
            "discount": 25,
            "stock": 100,
            "description": "Fresh and juicy red apples",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Organic Carrots",
            "price": 80,
            "image": "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300",
            "category": "Fruits & Vegetables",
            "pack_size": "500g Pack",
            "is_veg": True,
            "badge": "Organic",
            "stock": 50,
            "description": "Fresh organic carrots",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Fresh Milk",
            "price": 65,
            "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300",
            "category": "Dairy & Bakery",
            "pack_size": "1L Pack",
            "is_veg": True,
            "badge": "Farm Fresh",
            "stock": 30,
            "description": "Fresh farm milk",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Premium Basmati Rice",
            "price": 350,
            "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
            "category": "Home & Kitchen",
            "pack_size": "5kg Pack",
            "is_veg": True,
            "badge": "Premium",
            "stock": 25,
            "description": "Long grain basmati rice",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Mixed Dry Fruits",
            "price": 299,
            "original_price": 399,
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
            "category": "Snacks & Beverages",
            "pack_size": "250g Pack",
            "is_veg": True,
            "badge": "Bestseller",
            "discount": 25,
            "stock": 40,
            "description": "Premium mixed dry fruits",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Whole Wheat Bread",
            "price": 45,
            "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
            "category": "Dairy & Bakery",
            "pack_size": "1 Loaf",
            "is_veg": True,
            "badge": "Fresh",
            "stock": 60,
            "description": "Soft whole wheat bread",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    ]
    
    # Insert products
    result = await products_collection.insert_many(sample_products)
    print(f"Successfully added {len(result.inserted_ids)} products to MongoDB")
    
    # Create indexes
    await products_collection.create_index([("name", "text"), ("category", "text")])
    print("Created text search indexes")

if __name__ == "__main__":
    asyncio.run(add_sample_products())