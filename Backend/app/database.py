from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

MONGODB_URI = config("MONGODB_URI")

client = AsyncIOMotorClient(MONGODB_URI)
database = client.kwikmart

# Collections
users_collection = database.users
products_collection = database.products
orders_collection = database.orders
wishlists_collection = database.wishlists