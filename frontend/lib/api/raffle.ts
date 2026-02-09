import { apiFetch } from "./client"
import { DrawResponse, Raffle, RafflePayload } from "@/types/raffle"

export function listRaffles() {
  return apiFetch<Raffle[]>("/raffles")
}

export function getRaffle(id: string) {
  return apiFetch<Raffle>(`/raffles/${id}`)
}

export function createRaffle(payload: RafflePayload) {
  return apiFetch<Raffle>("/raffles", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateRaffle(id: string, payload: RafflePayload) {
  return apiFetch<Raffle>(`/raffles/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export function drawEntry(id: string) {
  return apiFetch<DrawResponse>(`/raffles/${id}/draw`, {
    method: "POST",
  })
}

export function resetRaffle(id: string) {
  return apiFetch<Raffle>(`/raffles/${id}/reset`, {
    method: "POST",
  })
}
