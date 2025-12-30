from fastapi import FastAPI
from models import Raffle
from storage import load_raffle, save_raffle
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/raffle", response_model=Raffle | None)
def get_raffle():
    return load_raffle()

@app.post("/raffle")
def save_raffle_endpoint(raffle: Raffle):
    save_raffle(raffle)
    return {"status": "saved"}


@app.get("/raffle/pick")
def pick_winner():
    raffle = load_raffle()
    if raffle is None or len(raffle.entries) == 0:
        raise HTTPException(status_code=404, detail="No raffle or entries found")
    
    winner = random.choice(raffle.entries)
    return {"winner": winner}



@app.get("/health")
def health():
    return {"status": "ok"}