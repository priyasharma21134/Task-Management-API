from pymongo import MongoClient
# MongoDB connection string
MONGO_URI = "mongodb://localhost:27017/"
# Database
client = MongoClient(MONGO_URI)
db = client["task_management"]
#Collection
tasks_collection = db["tasks"]
print("Connected to MongoDB successfully!")
