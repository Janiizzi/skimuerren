import random
from datetime import datetime
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from models import DrawResult, Raffle, RaffleEntry, RafflePayload
from storage import get_raffle, list_raffles, save_raffle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _require_raffle(raffle_id: str) -> Raffle:
    raffle = get_raffle(raffle_id)
    if raffle is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Raffle not found")
    return raffle


@app.get("/raffles", response_model=list[Raffle])
def list_raffles_endpoint():
    return list_raffles()


@app.get("/raffles/{raffle_id}", response_model=Raffle)
def get_raffle_endpoint(raffle_id: str):
    return _require_raffle(raffle_id)


@app.post("/raffles", response_model=Raffle, status_code=status.HTTP_201_CREATED)
def create_raffle(payload: RafflePayload):
    now = datetime.utcnow()
    entries = [
        RaffleEntry(id=entry.id or str(uuid4()), label=entry.label, imageUrl=entry.imageUrl)
        for entry in payload.entries
    ]
    raffle = Raffle(
        id=str(uuid4()),
        name=payload.name,
        description=payload.description,
        entries=entries,
        createdAt=now,
    )
    return save_raffle(raffle)


@app.put("/raffles/{raffle_id}", response_model=Raffle)
def update_raffle(raffle_id: str, payload: RafflePayload):
    raffle = _require_raffle(raffle_id)
    previous_entries = {entry.id: entry for entry in raffle.entries}
    entries = []
    for entry in payload.entries:
        entry_id = entry.id or str(uuid4())
        persisted = previous_entries.get(entry_id)
        entries.append(
            RaffleEntry(
                id=entry_id,
                label=entry.label,
                imageUrl=entry.imageUrl,
                drawIndex=persisted.drawIndex if persisted else None,
                drawnAt=persisted.drawnAt if persisted else None,
            )
        )

    last_entry_preserved = any(entry.id == raffle.lastDrawnEntryId for entry in entries)
    updated = Raffle(
        id=raffle.id,
        name=payload.name,
        description=payload.description,
        entries=entries,
        createdAt=raffle.createdAt,
        lastDrawnAt=raffle.lastDrawnAt if last_entry_preserved else None,
        lastDrawnEntryId=raffle.lastDrawnEntryId if last_entry_preserved else None,
    )
    return save_raffle(updated)


@app.post("/raffles/{raffle_id}/draw", response_model=DrawResult)
def draw_entry(raffle_id: str):
    raffle = _require_raffle(raffle_id)
    available = [entry for entry in raffle.entries if entry.drawIndex is None]
    if not available:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Alle Teilnehmer sind bereits gezogen")

    winner = random.choice(available)
    next_index = max((entry.drawIndex or 0 for entry in raffle.entries), default=0) + 1
    winner.drawIndex = next_index
    winner.drawnAt = datetime.utcnow()
    raffle.lastDrawnEntryId = winner.id
    raffle.lastDrawnAt = winner.drawnAt

    save_raffle(raffle)
    remaining = len(available) - 1
    return DrawResult(raffle=raffle, entry=winner, remaining=remaining)


@app.post("/raffles/{raffle_id}/reset", response_model=Raffle)
def reset_raffle(raffle_id: str):
    raffle = _require_raffle(raffle_id)
    for entry in raffle.entries:
        entry.drawIndex = None
        entry.drawnAt = None
    raffle.lastDrawnAt = None
    raffle.lastDrawnEntryId = None
    return save_raffle(raffle)


@app.get("/health")
def health():
    return {"status": "ok"}