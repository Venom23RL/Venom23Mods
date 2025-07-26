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


def model_to_dict(model):
    """Convert Pydantic model to dict with HttpUrl converted to strings"""
    data = model.dict()
    for key, value in data.items():
        if hasattr(value, '__str__') and 'HttpUrl' in str(type(value)):
            data[key] = str(value)
    return data


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

# Biography Endpoints
@api_router.get("/biography", response_model=Biography)
async def get_biography():
    """Get the streamer's biography"""
    bio_data = await db.biography.find_one()
    if not bio_data:
        # Return default data if none exists
        default_bio = Biography(
            name="LadyPi89",
            title="Rocket League Streamer & Content Creator",
            bio="Soy de España concretamente en las islas canarias aunque ahora vivo en Málaga",
            tagline="Me podrás encontrar y jugar conmigo si hay hueco en las partidas"
        )
        await db.biography.insert_one(model_to_dict(default_bio))
        return default_bio
    return Biography(**bio_data)

@api_router.put("/biography", response_model=Biography)
async def update_biography(biography_update: BiographyUpdate):
    """Update the streamer's biography"""
    bio_data = await db.biography.find_one()
    if not bio_data:
        raise HTTPException(status_code=404, detail="Biography not found")
    
    update_dict = {k: v for k, v in biography_update.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.biography.update_one(
        {"id": bio_data["id"]}, 
        {"$set": update_dict}
    )
    
    updated_bio = await db.biography.find_one({"id": bio_data["id"]})
    return Biography(**updated_bio)

# Partnership Endpoints
@api_router.get("/partnerships", response_model=List[Partnership])
async def get_partnerships():
    """Get all partnerships"""
    partnerships = await db.partnerships.find().to_list(1000)
    if not partnerships:
        # Return default partnerships if none exist
        default_partnerships = [
            Partnership(
                name="Sin Frenos League",
                role="Embajadora",
                logo="💎",
                handle="@sinfrenosleague"
            ),
            Partnership(
                name="ClaveCD",
                role="Partner",
                logo="🕹️",
                handle="@Clavecd",
                url="https://www.clavecd.es/?partner-ladypi89"
            )
        ]
        for partnership in default_partnerships:
            await db.partnerships.insert_one(model_to_dict(partnership))
        return default_partnerships
    return [Partnership(**partnership) for partnership in partnerships]

@api_router.post("/partnerships", response_model=Partnership)
async def create_partnership(partnership: PartnershipCreate):
    """Create a new partnership"""
    new_partnership = Partnership(**partnership.dict())
    await db.partnerships.insert_one(new_partnership.dict())
    return new_partnership

@api_router.put("/partnerships/{partnership_id}", response_model=Partnership)
async def update_partnership(partnership_id: str, partnership_update: PartnershipUpdate):
    """Update a partnership"""
    existing_partnership = await db.partnerships.find_one({"id": partnership_id})
    if not existing_partnership:
        raise HTTPException(status_code=404, detail="Partnership not found")
    
    update_dict = {k: v for k, v in partnership_update.dict().items() if v is not None}
    
    await db.partnerships.update_one(
        {"id": partnership_id}, 
        {"$set": update_dict}
    )
    
    updated_partnership = await db.partnerships.find_one({"id": partnership_id})
    return Partnership(**updated_partnership)

@api_router.delete("/partnerships/{partnership_id}")
async def delete_partnership(partnership_id: str):
    """Delete a partnership"""
    result = await db.partnerships.delete_one({"id": partnership_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Partnership not found")
    return {"message": "Partnership deleted successfully"}

# Social Media Endpoints
@api_router.get("/social-media", response_model=List[SocialMedia])
async def get_social_media():
    """Get all social media links"""
    social_media = await db.social_media.find().to_list(1000)
    if not social_media:
        # Return default social media if none exist
        default_social_media = [
            SocialMedia(platform="Twitch", url="https://www.twitch.tv/ladypi89", icon="play", color="#9146ff"),
            SocialMedia(platform="TikTok", url="https://www.tiktok.com/@ladypi89", icon="tiktok", color="#ff0050"),
            SocialMedia(platform="Twitter", url="https://x.com/LadyPi89", icon="twitter", color="#1da1f2"),
            SocialMedia(platform="YouTube", url="https://www.youtube.com/channel/UCDghFBnSUFW7aYc4YaYp2Dw", icon="youtube", color="#ff0000"),
            SocialMedia(platform="Instagram", url="https://www.instagram.com/ladypi89_oficial/", icon="instagram", color="#e4405f"),
            SocialMedia(platform="Discord", url="https://discord.com/invite/asQR5zVSgE", icon="discord", color="#7289da"),
            SocialMedia(platform="ClaveCD", url="https://www.clavecd.es/?partner-ladypi89", icon="gamepad-2", color="#00d4ff")
        ]
        for social in default_social_media:
            await db.social_media.insert_one(social.dict())
        return default_social_media
    return [SocialMedia(**social) for social in social_media]

@api_router.post("/social-media", response_model=SocialMedia)
async def create_social_media(social_media: SocialMediaCreate):
    """Create a new social media link"""
    new_social_media = SocialMedia(**social_media.dict())
    await db.social_media.insert_one(new_social_media.dict())
    return new_social_media

@api_router.put("/social-media/{social_media_id}", response_model=SocialMedia)
async def update_social_media(social_media_id: str, social_media_update: SocialMediaUpdate):
    """Update a social media link"""
    existing_social_media = await db.social_media.find_one({"id": social_media_id})
    if not existing_social_media:
        raise HTTPException(status_code=404, detail="Social media link not found")
    
    update_dict = {k: v for k, v in social_media_update.dict().items() if v is not None}
    
    await db.social_media.update_one(
        {"id": social_media_id}, 
        {"$set": update_dict}
    )
    
    updated_social_media = await db.social_media.find_one({"id": social_media_id})
    return SocialMedia(**updated_social_media)

@api_router.delete("/social-media/{social_media_id}")
async def delete_social_media(social_media_id: str):
    """Delete a social media link"""
    result = await db.social_media.delete_one({"id": social_media_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Social media link not found")
    return {"message": "Social media link deleted successfully"}

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(contact: ContactFormCreate):
    """Submit a contact form"""
    new_contact = ContactForm(**contact.dict())
    await db.contact_forms.insert_one(new_contact.dict())
    return new_contact

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms():
    """Get all contact form submissions"""
    contact_forms = await db.contact_forms.find().sort("created_at", -1).to_list(1000)
    return [ContactForm(**contact) for contact in contact_forms]

@api_router.put("/contact/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Update contact form status"""
    if status not in ["new", "read", "responded"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.contact_forms.update_one(
        {"id": contact_id}, 
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact form not found")
    return {"message": "Contact status updated successfully"}

# Streaming Status endpoint
@api_router.get("/streaming-status", response_model=StreamingStatus)
async def get_streaming_status():
    """Get current streaming status"""
    status_data = await db.streaming_status.find_one()
    if not status_data:
        # Return default streaming status if none exists
        default_status = StreamingStatus(
            platform="Twitch",
            url="https://www.twitch.tv/ladypi89",
            status="offline",
            game="Rocket League"
        )
        await db.streaming_status.insert_one(default_status.dict())
        return default_status
    return StreamingStatus(**status_data)

@api_router.put("/streaming-status", response_model=StreamingStatus)
async def update_streaming_status(status: str, game: str = "Rocket League"):
    """Update streaming status"""
    if status not in ["online", "offline", "streaming"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    status_data = await db.streaming_status.find_one()
    if not status_data:
        raise HTTPException(status_code=404, detail="Streaming status not found")
    
    await db.streaming_status.update_one(
        {"id": status_data["id"]}, 
        {"$set": {"status": status, "game": game, "updated_at": datetime.utcnow()}}
    )
    
    updated_status = await db.streaming_status.find_one({"id": status_data["id"]})
    return StreamingStatus(**updated_status)

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
