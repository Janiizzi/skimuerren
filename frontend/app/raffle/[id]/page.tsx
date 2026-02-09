"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { drawEntry, getRaffle, resetRaffle } from "@/lib/api/raffle"
import { Raffle } from "@/types/raffle"

const ITEM_HEIGHT = 64

export default function RaffleDetailPage() {
  const params = useParams()
  const raffleIdParam = params?.id
  const raffleId = Array.isArray(raffleIdParam) ? raffleIdParam[0] : raffleIdParam

  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingDraw, setLoadingDraw] = useState(false)
  const [loadingReset, setLoadingReset] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const [tickerStep, setTickerStep] = useState(0)

  const remainingEntries = useMemo(() => {
    if (!raffle) return []
    return raffle.entries.filter((entry) => entry.drawIndex === undefined || entry.drawIndex === null)
  }, [raffle])

  const drawnEntries = useMemo(() => {
    if (!raffle) return []
    return [...raffle.entries]
      .filter((entry) => entry.drawIndex !== undefined && entry.drawIndex !== null)
      .sort((a, b) => (a.drawIndex ?? 0) - (b.drawIndex ?? 0))
  }, [raffle])

  const loadRaffle = useCallback(async () => {
    if (!raffleId) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await getRaffle(raffleId)
      setRaffle(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konnte Raffle nicht laden")
    } finally {
      setIsLoading(false)
    }
  }, [raffleId])

  useEffect(() => {
    loadRaffle()
  }, [loadRaffle])

  useEffect(() => {
    setTickerStep(0)
  }, [remainingEntries.length])

  useEffect(() => {
    if (!remainingEntries.length) return
    const interval = setInterval(() => {
      setTickerStep((prev) => prev + 1)
    }, 1400)
    return () => clearInterval(interval)
  }, [remainingEntries.length])

  const setRaffleState = (next: Raffle) => {
    setRaffle(next)
    setHighlighted(next.lastDrawnEntryId ?? null)
    setTimeout(() => setHighlighted(null), 3000)
  }

  const handleDraw = async () => {
    if (!raffle) return
    setLoadingDraw(true)
    setError(null)
    try {
      const result = await drawEntry(raffle.id)
      setRaffleState(result.raffle)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler")
    } finally {
      setLoadingDraw(false)
    }
  }

  const handleReset = async () => {
    if (!raffle) return
    setLoadingReset(true)
    setError(null)
    try {
      const next = await resetRaffle(raffle.id)
      setRaffle(next)
      setHighlighted(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset fehlgeschlagen")
    } finally {
      setLoadingReset(false)
    }
  }

  const offset = remainingEntries.length ? tickerStep % remainingEntries.length : 0
  const translateY = -(offset * ITEM_HEIGHT)
  const tickerEntries = remainingEntries.length ? [...remainingEntries, ...remainingEntries] : []
  const activeTickerEntry = remainingEntries.length ? remainingEntries[offset] : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#cfe6ff] via-white to-[#fdfbff] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Animierte Auslosung</p>
            <h1 className="mt-2 text-3xl font-semibold text-snowblue">
              {raffle ? raffle.name : isLoading ? "Lade…" : "Unbekanntes Raffle"}
            </h1>
            {raffle?.description && <p className="text-sm text-slate-500">{raffle.description}</p>}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="rounded-full border border-snowblue/30 px-4 py-2 text-snowblue hover:border-snowblue">
              Zur Übersicht
            </Link>
            <button
              onClick={handleReset}
              disabled={!raffle || loadingReset}
              className="rounded-full border border-snowblue/40 px-4 py-2 text-snowblue transition hover:border-snowblue disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
            >
              {loadingReset ? "Setze zurück…" : "Topf leeren"}
            </button>
            <button
              onClick={handleDraw}
              disabled={!raffle || !remainingEntries.length || loadingDraw}
              className="rounded-full bg-snowblue px-5 py-2 font-semibold text-white transition hover:bg-snowblue/90 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loadingDraw ? "Ziehe…" : remainingEntries.length ? "Nächsten Namen ziehen" : "Alles gezogen"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!raffle && !isLoading && (
          <div className="mt-10 rounded-3xl border border-dashed border-snowred/30 bg-white/70 p-6 text-center text-slate-500">
            Raffle wurde nicht gefunden. <Link href="/" className="text-snowblue underline">Zurück zur Übersicht</Link>
          </div>
        )}

        {raffle && (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-white/80 p-6 shadow-2xl shadow-snowblue/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Im Lostopf</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-800">{remainingEntries.length} verbleibend</h2>

              {remainingEntries.length > 0 ? (
                <>
                  <div className="mt-4 rounded-3xl bg-gradient-to-br from-snowblue/10 via-white to-white p-6 shadow-inner">
                    <p className="text-xs uppercase tracking-[0.4em] text-snowblue/80">Shuffle</p>
                    <div className="mt-2 text-3xl font-bold text-snowblue">
                      {activeTickerEntry?.label ?? "-"}
                    </div>
                    <p className="text-xs text-slate-500">Namen werden automatisch durchgescrollt, bis du ziehst.</p>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white/70" style={{ height: ITEM_HEIGHT * 3 }}>
                    <div
                      className="ticker-track"
                      style={{
                        transform: `translateY(${translateY}px)`,
                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {tickerEntries.map((entry, index) => (
                        <div
                          key={`${entry.id}-${index}`}
                          className="flex h-16 items-center justify-between border-b border-slate-100 px-4 text-slate-600 last:border-none"
                        >
                          <span>{entry.label}</span>
                          <span className="text-xs text-slate-400">Im Topf</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-snowblue/40 bg-white/70 p-6 text-center text-slate-500">
                  Alle Namen wurden gezogen. Du kannst oben eine neue Runde starten.
                </div>
              )}
            </section>

            <section className="rounded-3xl bg-white/85 p-6 shadow-xl shadow-snowblue/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Gezogene Namen</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-800">{drawnEntries.length} vergeben</h2>

              <ul className="mt-4 space-y-3">
                {drawnEntries.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-slate-500">
                    Noch kein Name gezogen.
                  </li>
                )}

                {drawnEntries.map((entry) => (
                  <li
                    key={entry.id}
                    className={`flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 text-sm ${
                      highlighted === entry.id ? "bg-snowyellow/50" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold text-slate-700">#{entry.drawIndex} – {entry.label}</span>
                    <span className="text-xs text-slate-400">
                      {entry.drawnAt
                        ? new Date(entry.drawnAt).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
