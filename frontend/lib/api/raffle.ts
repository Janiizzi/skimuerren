import { Raffle } from "@/types/raffle"
import { apiFetch } from "./client"
import { RaffleEntry } from "@/types/raffle"

export function loadRaffle() {
  return apiFetch<Raffle | null>("/raffle")
}

export function saveRaffle(raffle: Raffle) {
  return apiFetch("/raffle", {
    method: "POST",
    body: JSON.stringify(raffle),
  })
}

export function pickWinner() {
  return apiFetch<RaffleEntry>("/raffle/pick", {
    method: "POST",
  })
}
