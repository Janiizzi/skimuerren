"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { listRaffles } from "@/lib/api/raffle"
import { Raffle } from "@/types/raffle"

export default function HomePage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRaffles = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await listRaffles()
      setRaffles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konnte Raffles nicht laden")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRaffles()
  }, [loadRaffles])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#e9f3ff] to-[#fdfbff] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <section className="rounded-3xl bg-white/70 p-6 shadow-2xl shadow-snowblue/20 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.2em] text-snowblue/80">Skischule Mürren</p>
          <h1 className="mt-2 text-4xl font-semibold text-snowblue drop-shadow">
            Willkommen im Raffle-Hub
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Wähle eine Auslosung aus und öffne die animierte Ziehungsseite, um Namen nacheinander zu ziehen.
            Jede Auslosung speichert automatisch die gezogenen Teilnehmer:innen, damit du jederzeit weitermachen kannst.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <button
              onClick={loadRaffles}
              className="rounded-full border border-snowblue/40 px-4 py-2 text-snowblue transition hover:border-snowblue"
              disabled={isLoading}
            >
              {isLoading ? "Aktualisiere…" : "Raffles aktualisieren"}
            </button>
            <Link
              href="/edit"
              className="rounded-full bg-snowblue px-5 py-2 font-semibold text-white transition hover:bg-snowblue/90"
            >
              Neues Raffle anlegen
            </Link>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {raffles.map((raffle) => {
            const drawnCount = raffle.entries.filter((entry) => entry.drawIndex !== undefined && entry.drawIndex !== null).length
            return (
              <div key={raffle.id} className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-lg shadow-snowblue/10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Raffle</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-800">{raffle.name}</h2>
                {raffle.description && <p className="mt-1 text-sm text-slate-500">{raffle.description}</p>}
                <div className="mt-4 rounded-2xl bg-slate-50/80 p-3 text-sm text-slate-600">
                  <p>{raffle.entries.length} Teilnehmer:innen</p>
                  <p>{drawnCount} bereits gezogen</p>
                  {raffle.lastDrawnEntryId && raffle.lastDrawnAt && (
                    <p className="text-xs text-snowblue">
                      Letzte Ziehung {new Date(raffle.lastDrawnAt).toLocaleString("de-CH", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex flex-1 items-end">
                  <Link
                    href={`/raffle/${raffle.id}`}
                    className="w-full rounded-full bg-snowblue px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-snowblue/90"
                  >
                    Animierte Auslosung starten
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {!raffles.length && !isLoading && (
          <div className="mt-10 rounded-3xl border border-dashed border-snowblue/30 bg-white/70 p-8 text-center text-slate-500">
            Noch keine Raffles vorhanden. <Link href="/edit" className="text-snowblue underline">Lege jetzt eines an</Link> und starte danach die Auslosung.
          </div>
        )}
      </div>
    </main>
  )
}
