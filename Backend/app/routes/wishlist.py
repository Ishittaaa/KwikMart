from fastapi import APIRouter, HTTPException, Depends
from app.schemas.wishlist import WishlistAdd, WishlistResponse
from app.services.wishlist_service import WishlistService
from app.utils.dependencies import get_current_user_id

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.post("/add")
async def add_to_wishlist(item: WishlistAdd, user_id: str = Depends(get_current_user_id)):
    try:
        result = await WishlistService.add_to_wishlist(user_id, item.product_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/remove/{product_id}")
async def remove_from_wishlist(product_id: str, user_id: str = Depends(get_current_user_id)):
    try:
        result = await WishlistService.remove_from_wishlist(user_id, product_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/", response_model=WishlistResponse)
async def get_wishlist(user_id: str = Depends(get_current_user_id)):
    wishlist = await WishlistService.get_user_wishlist(user_id)
    if not wishlist:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    return wishlist