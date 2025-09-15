from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products, orders, wishlist

app = FastAPI(title="KwikMart API", version="1.0.0", description="KwikMart E-commerce API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(wishlist.router)

@app.get("/")
async def root():
    return {"message": "KwikMart API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "KwikMart API"}