from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products, orders, wishlist, admin

app = FastAPI(title="KwikMart API", version="1.0.0", description="KwikMart E-commerce API")

# CORS middleware - Completely open for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=False,  # Set to False when using allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
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