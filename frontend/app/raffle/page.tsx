"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { listRaffles } from "@/lib/api/raffle"
import { Raffle } from "@/types/raffle"

const RaffleOverviewPage = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([])

  useEffect(() => {
    listRaffles().then(setRaffles).catch(() => setRaffles([]))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f5ff] via-white to-[#fdf8ff] pb-16">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Übersicht</p>
          <h1 className="mt-2 text-3xl font-semibold text-snowblue">Raffle-Status</h1>
          <p className="mt-2 text-slate-500">Behalte den Überblick über alle Auslosungen und deren Fortschritt.</p>
          <Link href="/" className="mt-3 inline-block rounded-full bg-snowblue/90 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-snowblue">
            Zur Auslosung
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {raffles.map((raffle) => {
            const drawnCount = raffle.entries.filter((entry) => entry.drawIndex !== undefined && entry.drawIndex !== null).length
            const progress = raffle.entries.length ? Math.round((drawnCount / raffle.entries.length) * 100) : 0
            const lastWinner = raffle.entries
              .filter((entry) => entry.id === raffle.lastDrawnEntryId)
              .at(0)

            return (
              <div key={raffle.id} className="rounded-3xl border border-slate-100 bg-white/85 p-5 shadow-xl shadow-snowblue/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{raffle.name}</h2>
                    {raffle.description && <p className="text-sm text-slate-500">{raffle.description}</p>}
                  </div>
                  <span className="text-sm font-semibold text-snowblue">{progress}%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-snowblue transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {drawnCount} von {raffle.entries.length} Namen gezogen
                </p>
                {lastWinner && (
                  <p className="mt-3 rounded-2xl bg-snowyellow/40 px-3 py-2 text-sm text-slate-700">
                    Letzter Gewinn: {lastWinner.label}
                  </p>
                )}
              </div>
            )
          })}

          {!raffles.length && (
            <div className="rounded-3xl border border-dashed border-snowblue/30 bg-white/70 p-6 text-center text-slate-500">
              Noch keine Raffles gespeichert. <Link href="/edit" className="text-snowblue underline">Jetzt erstellen</Link>.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default RaffleOverviewPage