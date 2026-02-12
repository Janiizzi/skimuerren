import json
import os
from pathlib import Path
from typing import List

from models import Raffle

_DEFAULT_STORAGE_FILE = Path(__file__).with_name("raffles.json")
_configured_path = os.environ.get("RAFFLES_STORAGE_PATH")
STORAGE_FILE = Path(_configured_path) if _configured_path else _DEFAULT_STORAGE_FILE


def _read_all() -> List[Raffle]:
    if not STORAGE_FILE.exists():
        return []
    data = json.loads(STORAGE_FILE.read_text())
    return [Raffle.model_validate(item) for item in data]


def _write_all(raffles: List[Raffle]):
    STORAGE_FILE.parent.mkdir(parents=True, exist_ok=True)
    serialized = [raffle.model_dump(mode="json") for raffle in raffles]
    STORAGE_FILE.write_text(json.dumps(serialized, indent=2))


def list_raffles() -> List[Raffle]:
    return _read_all()


def get_raffle(raffle_id: str) -> Raffle | None:
    return next((raffle for raffle in _read_all() if raffle.id == raffle_id), None)


def save_raffle(raffle: Raffle) -> Raffle:
    raffles = _read_all()
    for idx, existing in enumerate(raffles):
        if existing.id == raffle.id:
            raffles[idx] = raffle
            break
    else:
        raffles.append(raffle)
    _write_all(raffles)
    return raffle


def delete_raffle(raffle_id: str) -> None:
    raffles = _read_all()
    filtered = [raffle for raffle in raffles if raffle.id != raffle_id]
    if len(filtered) == len(raffles):
        return
    _write_all(filtered)
