import json
from pathlib import Path
from models import Raffle

STORAGE_FILE = Path("raffle.json")

def load_raffle() -> Raffle | None:
    if not STORAGE_FILE.exists():
        return None
    with open(STORAGE_FILE) as f:
        return Raffle.model_validate_json(f.read())

def save_raffle(raffle: Raffle):
    with open(STORAGE_FILE, "w") as f:
        f.write(raffle.model_dump_json())
