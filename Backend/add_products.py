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
    print(f"Current products in database: {existing_count}")
    
    # Sample products for all categories
    sample_products = [
        # Fruits & Vegetables
        {
            "name": "Fresh Red Apples",
            "price": 120,
            "original_price": 160,
            "category": "Fruits & Vegetables",
            "pack_size": "1kg Pack",
            "stock": 45,
            "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300",
            "is_veg": True,
            "badge": "Fresh",
            "discount": 25,
            "description": "Crisp and sweet red apples, perfect for snacking",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Organic Bananas",
            "price": 60,
            "category": "Fruits & Vegetables",
            "pack_size": "1 Dozen",
            "stock": 30,
            "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300",
            "is_veg": True,
            "badge": "Organic",
            "description": "Sweet and ripe organic bananas",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Fresh Tomatoes",
            "price": 40,
            "category": "Fruits & Vegetables",
            "pack_size": "500g Pack",
            "stock": 25,
            "image": "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300",
            "is_veg": True,
            "badge": "Fresh",
            "description": "Fresh red tomatoes for cooking",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        
        # Dairy & Bakery
        {
            "name": "Fresh Milk",
            "price": 65,
            "category": "Dairy & Bakery",
            "pack_size": "1L Pack",
            "stock": 40,
            "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300",
            "is_veg": True,
            "badge": "Farm Fresh",
            "description": "Pure and fresh milk from local farms",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Whole Wheat Bread",
            "price": 45,
            "category": "Dairy & Bakery",
            "pack_size": "1 Loaf",
            "stock": 20,
            "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
            "is_veg": True,
            "badge": "Fresh",
            "description": "Soft whole wheat bread, baked fresh daily",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Greek Yogurt",
            "price": 85,
            "category": "Dairy & Bakery",
            "pack_size": "200g Cup",
            "stock": 35,
            "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300",
            "is_veg": True,
            "badge": "Protein Rich",
            "description": "Thick and creamy Greek yogurt",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        
        # Snacks & Beverages
        {
            "name": "Mixed Dry Fruits",
            "price": 299,
            "original_price": 399,
            "category": "Snacks & Beverages",
            "pack_size": "250g Pack",
            "stock": 15,
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
            "is_veg": True,
            "badge": "Premium",
            "discount": 25,
            "description": "Premium mixed dry fruits for healthy snacking",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Orange Juice",
            "price": 80,
            "category": "Snacks & Beverages",
            "pack_size": "1L Bottle",
            "stock": 25,
            "image": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300",
            "is_veg": True,
            "badge": "Fresh",
            "description": "Fresh orange juice, no preservatives",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        
        # Beauty & Personal Care
        {
            "name": "Herbal Shampoo",
            "price": 250,
            "category": "Beauty & Personal Care",
            "pack_size": "200ml Bottle",
            "stock": 30,
            "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300",
            "is_veg": True,
            "badge": "Natural",
            "description": "Natural herbal shampoo for all hair types",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Face Moisturizer",
            "price": 180,
            "category": "Beauty & Personal Care",
            "pack_size": "50ml Tube",
            "stock": 20,
            "image": "https://images.unsplash.com/photo-1556228578-dd6f8c2e0c2d?w=300",
            "is_veg": True,
            "badge": "Dermatologist Tested",
            "description": "Daily face moisturizer for all skin types",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        
        # Electronics
        {
            "name": "Wireless Earbuds",
            "price": 2999,
            "original_price": 3999,
            "category": "Electronics",
            "pack_size": "1 Pair",
            "stock": 10,
            "image": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300",
            "is_veg": False,
            "badge": "Bluetooth 5.0",
            "discount": 25,
            "description": "High-quality wireless earbuds with noise cancellation",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Phone Charger",
            "price": 599,
            "category": "Electronics",
            "pack_size": "1 Unit",
            "stock": 50,
            "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
            "is_veg": False,
            "badge": "Fast Charging",
            "description": "Universal fast charging cable",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        
        # Home & Kitchen
        {
            "name": "Premium Basmati Rice",
            "price": 350,
            "category": "Home & Kitchen",
            "pack_size": "5kg Pack",
            "stock": 12,
            "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
            "is_veg": True,
            "badge": "Premium",
            "description": "Long grain basmati rice with authentic aroma",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        },
        {
            "name": "Kitchen Towels",
            "price": 120,
            "category": "Home & Kitchen",
            "pack_size": "Pack of 6",
            "stock": 40,
            "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300",
            "is_veg": False,
            "badge": "Absorbent",
            "description": "Super absorbent kitchen towels",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
    ]
    
    # Insert products
    if existing_count < 10:  # Only add if we don't have many products
        result = await products_collection.insert_many(sample_products)
        print(f"Successfully added {len(result.inserted_ids)} products to MongoDB")
        
        # Create text search index
        try:
            await products_collection.create_index([("name", "text"), ("category", "text"), ("description", "text")])
            print("Created text search indexes")
        except:
            print("Indexes already exist")
    else:
        print("Products already exist, skipping insertion")
    
    # Show final count
    final_count = await products_collection.count_documents({})
    print(f"Total products in database: {final_count}")

if __name__ == "__main__":
    asyncio.run(add_sample_products())