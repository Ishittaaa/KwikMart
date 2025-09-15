from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.schemas.product import ProductResponse
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(50, le=100)
):
    products = await ProductService.get_products(category, search, limit)
    return products

@router.get("/featured", response_model=List[ProductResponse])
async def get_featured_products():
    products = await ProductService.get_featured_products()
    return products

@router.get("/categories")
async def get_categories():
    return await ProductService.get_categories()

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    product = await ProductService.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product