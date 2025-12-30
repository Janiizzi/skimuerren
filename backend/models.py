from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RaffleEntry(BaseModel):
    id: str
    label: str
    imageUrl: Optional[str] = None

class Raffle(BaseModel):
    id: str
    entries: List[RaffleEntry]
    createdAt: datetime
