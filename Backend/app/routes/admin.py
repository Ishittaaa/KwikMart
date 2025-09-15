from fastapi import APIRouter, Depends, HTTPException
from app.database import users_collection, products_collection, orders_collection
from app.utils.dependencies import get_current_user
from app.schemas.user import UserCreate, UserUpdate
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.auth import get_password_hash
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats")
async def get_admin_stats(current_user: dict = Depends(get_current_user)):
    # Check if user is admin
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Get counts from database
    total_users = await users_collection.count_documents({})
    total_products = await products_collection.count_documents({})
    total_orders = await orders_collection.count_documents({})
    
    # Calculate revenue (sum of all order amounts)
    pipeline = [
        {"$group": {"_id": None, "total_revenue": {"$sum": "$total_amount"}}}
    ]
    revenue_result = await orders_collection.aggregate(pipeline).to_list(1)
    total_revenue = revenue_result[0]["total_revenue"] if revenue_result else 0
    
    # Get pending orders count
    pending_orders = await orders_collection.count_documents({"status": "pending"})
    
    # Get low stock items (stock < 10)
    low_stock_items = await products_collection.count_documents({"stock": {"$lt": 10}})
    
    return {
        "total_users": total_users,
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "pending_orders": pending_orders,
        "low_stock_items": low_stock_items
    }

@router.get("/users")
async def get_all_users(current_user: dict = Depends(get_current_user)):
    # Check if user is admin
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Get all users (exclude passwords)
    cursor = users_collection.find({}, {"password": 0}).sort("created_at", -1)
    users = await cursor.to_list(length=100)
    
    # Convert ObjectId to string
    for user in users:
        user["id"] = str(user.pop("_id"))
    
    return users

@router.get("/products")
async def get_all_products(current_user: dict = Depends(get_current_user)):
    # Check if user is admin
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Get all products
    cursor = products_collection.find({}).sort("created_at", -1)
    products = await cursor.to_list(length=100)
    
    # Convert ObjectId to string and add status based on stock
    for product in products:
        product["id"] = str(product.pop("_id"))
        product["status"] = "Low Stock" if product.get("stock", 0) < 10 else "Active"
    
    return products

# User CRUD Operations
@router.post("/users")
async def create_user(user_data: UserCreate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user document
    user_doc = {
        "name": user_data.name,
        "email": user_data.email,
        "phone": user_data.phone,
        "password": get_password_hash(user_data.password),
        "role": "user",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        "join_date": datetime.now(),
        "addresses": [],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    result = await users_collection.insert_one(user_doc)
    user_doc["id"] = str(result.inserted_id)
    user_doc.pop("_id")
    user_doc.pop("password")
    
    return user_doc

@router.put("/users/{user_id}")
async def update_user(user_id: str, user_data: UserUpdate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        update_data = {k: v for k, v in user_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.now()
        
        result = await users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid user ID")

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        result = await users_collection.delete_one({"_id": ObjectId(user_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid user ID")

# Product CRUD Operations
@router.post("/products")
async def create_product(product_data: ProductCreate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Create product document
    product_doc = {
        **product_data.dict(),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    result = await products_collection.insert_one(product_doc)
    product_doc["id"] = str(result.inserted_id)
    product_doc.pop("_id")
    product_doc["status"] = "Low Stock" if product_doc.get("stock", 0) < 10 else "Active"
    
    return product_doc

@router.put("/products/{product_id}")
async def update_product(product_id: str, product_data: ProductUpdate, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        update_data = {k: v for k, v in product_data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.now()
        
        result = await products_collection.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"message": "Product updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid product ID")

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        result = await products_collection.delete_one({"_id": ObjectId(product_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid product ID")