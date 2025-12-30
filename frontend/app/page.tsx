"use client"

import { useEffect, useState } from "react"
import { loadRaffle, saveRaffle, pickWinner } from "@/lib/api/raffle"
import { Raffle, RaffleEntry } from "@/types/raffle"
import { v4 as uuid } from "uuid"

export default function HomePage() {
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [input, setInput] = useState("")
  const [winner, setWinner] = useState<RaffleEntry | null>(null)


  return (
    <main>
      Test
    </main>
  )
}
