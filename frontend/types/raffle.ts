export type RaffleEntry = {
  id: string
  label: string
  imageUrl?: string
}

export type Raffle = {
  id: string
  entries: RaffleEntry[]
  createdAt: string
}
