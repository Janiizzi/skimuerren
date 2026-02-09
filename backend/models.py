from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class RaffleEntry(BaseModel):
    id: str
    label: str
    imageUrl: Optional[str] = None
    drawIndex: Optional[int] = None
    drawnAt: Optional[datetime] = None


class Raffle(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    entries: List[RaffleEntry]
    createdAt: datetime
    lastDrawnAt: Optional[datetime] = None
    lastDrawnEntryId: Optional[str] = None


class RaffleEntryPayload(BaseModel):
    label: str
    imageUrl: Optional[str] = None
    id: Optional[str] = None


class RafflePayload(BaseModel):
    name: str
    description: Optional[str] = None
    entries: List[RaffleEntryPayload]


class DrawResult(BaseModel):
    raffle: Raffle
    entry: RaffleEntry
    remaining: int
