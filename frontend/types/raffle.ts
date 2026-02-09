export type RaffleEntry = {
  id: string
  label: string
  imageUrl?: string
  drawIndex?: number | null
  drawnAt?: string | null
}

export type Raffle = {
  id: string
  name: string
  description?: string
  entries: RaffleEntry[]
  createdAt: string
  lastDrawnAt?: string | null
  lastDrawnEntryId?: string | null
}

export type RaffleEntryPayload = {
  id?: string
  label: string
  imageUrl?: string
}

export type RafflePayload = {
  name: string
  description?: string
  entries: RaffleEntryPayload[]
}

export type DrawResponse = {
  raffle: Raffle
  entry: RaffleEntry
  remaining: number
}
