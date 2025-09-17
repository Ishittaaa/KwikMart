from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products, orders, wishlist, admin

app = FastAPI(title="KwikMart API", version="1.0.0", description="KwikMart E-commerce API")

# CORS middleware - Network access enabled
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.*:3000",  # Local network range
        "http://192.168.0.*:3000",  # Alternative network range
        "http://10.0.0.*:3000",     # Another common range
        "*"  # Allow all for development
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Accept",
        "Accept-Language", 
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods"
    ],
)

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(wishlist.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {"message": "KwikMart API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "KwikMart API"}

# Handle CORS preflight requests
@app.options("/{path:path}")
async def options_handler(path: str):
    return {"message": "OK"}