"use client"

import { useEffect, useState } from "react"
import { loadRaffle, saveRaffle, pickWinner } from "@/lib/api/raffle"
import { Raffle, RaffleEntry } from "@/types/raffle"
import { v4 as uuid } from "uuid"

export default function HomePage() {
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [input, setInput] = useState("")
  const [winner, setWinner] = useState<RaffleEntry | null>(null)

  useEffect(() => {
    loadRaffle().then(setRaffle)
  }, [])

  async function addEntry() {
    if (!raffle || !input) return

    const updated = {
      ...raffle,
      entries: [...raffle.entries, { id: uuid(), label: input }],
    }

    setRaffle(updated)
    await saveRaffle(updated)
    setInput("")
  }

  async function pick() {
    const result = await pickWinner()
    setWinner(result)
  }

  if (!raffle) {
    return (
      <button
        onClick={() =>
          setRaffle({
            id: uuid(),
            entries: [],
            createdAt: new Date().toISOString(),
          })
        }
      >
        Create raffle
      </button>
    )
  }

  return (
    <main>
      <h1>Raffler</h1>

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addEntry}>Add</button>

      <ul>
        {raffle.entries.map(e => (
          <li key={e.id}>{e.label}</li>
        ))}
      </ul>

      <button onClick={pick}>Pick winner</button>

      {winner && <h2>Winner: {winner.label}</h2>}
    </main>
  )
}
