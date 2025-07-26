from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, HttpUrl
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models for Ladypi89 Website
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Biography Models
class Biography(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    bio: str
    tagline: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BiographyUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    tagline: Optional[str] = None

# Partnership Models
class Partnership(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    logo: str
    handle: str
    url: Optional[HttpUrl] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PartnershipCreate(BaseModel):
    name: str
    role: str
    logo: str
    handle: str
    url: Optional[HttpUrl] = None

class PartnershipUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    logo: Optional[str] = None
    handle: Optional[str] = None
    url: Optional[HttpUrl] = None

# Social Media Models
class SocialMedia(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    platform: str
    url: HttpUrl
    icon: str
    color: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SocialMediaCreate(BaseModel):
    platform: str
    url: HttpUrl
    icon: str
    color: str

class SocialMediaUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[HttpUrl] = None
    icon: Optional[str] = None
    color: Optional[str] = None

# Contact Form Models
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")  # new, read, responded

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

# Streaming Status Model
class StreamingStatus(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    platform: str
    url: HttpUrl
    status: str  # online, offline, streaming
    game: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
