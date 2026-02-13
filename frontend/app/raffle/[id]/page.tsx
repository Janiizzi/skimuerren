"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  const [showDrawOverlay, setShowDrawOverlay] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<"intro" | "celebration" | null>(null)
  const drawnListRef = useRef<HTMLUListElement | null>(null)
  const [stickToBottom, setStickToBottom] = useState(true)
  const [lockBodyScroll, setLockBodyScroll] = useState(false)
  const previousOverflowRef = useRef<string>("")
  const [currentDrawnInfo, setCurrentDrawnInfo] = useState<{ label: string; drawIndex: number | null } | null>(null)
  const introTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clearOverlayTimers = useCallback(() => {
    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current)
      introTimeoutRef.current = null
    }
  }, [])

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
    return () => {
      clearOverlayTimers()
    }
  }, [clearOverlayTimers])

  useEffect(() => {
    if (typeof window === "undefined") return
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setLockBodyScroll(event.matches)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener("change", handleChange as (event: MediaQueryListEvent) => void)

    return () => {
      mediaQuery.removeEventListener("change", handleChange as (event: MediaQueryListEvent) => void)
    }
  }, [])

  useEffect(() => {
    if (!stickToBottom || !drawnListRef.current) return
    const list = drawnListRef.current
    list.scrollTop = list.scrollHeight
  }, [drawnEntries, stickToBottom])

  useEffect(() => {
    if (typeof document === "undefined") return
    if (lockBodyScroll) {
      previousOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflowRef.current
      }
    } else {
      document.body.style.overflow = previousOverflowRef.current
    }
  }, [lockBodyScroll])

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

  const setRaffleState = useCallback((next: Raffle) => {
    setRaffle(next)
    setHighlighted(next.lastDrawnEntryId ?? null)
    const latest = [...next.entries]
      .filter((entry) => entry.drawIndex !== undefined && entry.drawIndex !== null)
      .sort((a, b) => (b.drawIndex ?? 0) - (a.drawIndex ?? 0))[0]
    if (latest) {
      setCurrentDrawnInfo({
        label: latest.label,
        drawIndex: latest.drawIndex ?? null,
      })
    } else {
      setCurrentDrawnInfo(null)
    }
    setTimeout(() => setHighlighted(null), 3000)
  }, [])

  const startCelebrationSequence = useCallback(() => {
    clearOverlayTimers()
    setShowDrawOverlay(true)
    setAnimationPhase("intro")
    introTimeoutRef.current = setTimeout(() => {
      setAnimationPhase("celebration")
    }, 2000)
  }, [clearOverlayTimers])

  const stopCelebrationSequence = useCallback(() => {
    clearOverlayTimers()
    setShowDrawOverlay(false)
    setAnimationPhase(null)
  }, [clearOverlayTimers])

  const handleDraw = useCallback(async () => {
    if (!raffle || !remainingEntries.length || loadingDraw) return
    setLoadingDraw(true)
    setError(null)
    try {
      const result = await drawEntry(raffle.id)
      setRaffleState(result.raffle)
      startCelebrationSequence()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler")
      stopCelebrationSequence()
    } finally {
      setLoadingDraw(false)
    }
  }, [raffle, remainingEntries.length, loadingDraw, setRaffleState, startCelebrationSequence, stopCelebrationSequence])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault()
        if (showDrawOverlay) {
          stopCelebrationSequence()
          return
        }
        handleDraw()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleDraw, showDrawOverlay, stopCelebrationSequence])

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

  const handleDrawnListScroll = () => {
    if (!drawnListRef.current) return
    const { scrollTop, clientHeight, scrollHeight } = drawnListRef.current
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 8
    setStickToBottom(isNearBottom)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#e9f3ff] to-[#fdfbff] pb-16 lg:h-screen lg:overflow-hidden">
      {showDrawOverlay && currentDrawnInfo && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white/10 backdrop-blur-lg px-6 text-center">
          {animationPhase === "intro" && (
            <div className="space-y-4 text-snowblue">
                <div className="text-4xl font-black tracking-[0.3em]">
                  #{currentDrawnInfo.drawIndex ?? "?"}
                </div>
                <p className="text-xl uppercase tracking-[0.4em] text-slate-500">
                  Das nächste Team ist
                  <span className="animated-ellipsis">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </p>
            </div>
          )}
          {animationPhase === "celebration" && (
            <div className="relative w-full -translate-y-16 lg:-translate-y-24">
              <DotLottieReact
                src="https://lottie.host/958c7179-b9bd-41b5-b725-8f2b15c2ddcb/OaxiZTrcyb.lottie"
                loop
                autoplay
                className="mx-auto w-[70%] lg:w-[65%]"
              />
              <div className="z-50 pointer-events-none absolute inset-0 flex items-center justify-center text-center translate-y-16 lg:translate-y-20">
                <div className="rounded-3xl text-5xl font-extrabold uppercase tracking-[0.4em] text-snowblue drop-shadow-2xl">
                  #{currentDrawnInfo.drawIndex ?? "-"} {currentDrawnInfo.label}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
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
              {loadingDraw ? "Ziehe…" : remainingEntries.length ? "Team ziehen " : "Alles gezogen"}
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
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:h-[calc(100vh-220px)] lg:min-h-0">
            <section className="rounded-3xl bg-white/80 p-6 shadow-2xl shadow-snowblue/10 lg:min-h-0">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Im Lostopf</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-800">{remainingEntries.length} verbleibend</h2>

              {remainingEntries.length > 0 ? (
                <>
                  <div className="mt-4 rounded-3xl bg-gradient-to-br from-snowblue/10 via-white to-white p-6 shadow-inner">
                    <p className="text-xs uppercase tracking-[0.4em] text-snowblue/80">Zufalls Auswahl</p>
                    <div className="mt-2 text-3xl font-bold text-snowblue">
                      {activeTickerEntry?.label ?? "-"}
                    </div>
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
                  Alle Teams wurden gezogen. Du kannst oben eine neue Runde starten.
                </div>
              )}
            </section>

            <section className="rounded-3xl bg-white/85 p-6 shadow-xl shadow-snowblue/10 flex flex-col lg:min-h-0 lg:overflow-hidden">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Gezogene Teams</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-800">{drawnEntries.length} vergeben</h2>

              <ul
                ref={drawnListRef}
                onScroll={handleDrawnListScroll}
                className="mt-4 space-y-3 overflow-y-auto pr-2 flex-1 lg:min-h-0"
              >
                {drawnEntries.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-slate-500">
                    Noch kein Team gezogen.
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
        <style jsx>{`
          .animated-ellipsis {
            display: inline-flex;
            margin-left: 0.4rem;
            letter-spacing: 0.2em;
          }
          .animated-ellipsis span {
            animation: ellipsisPulse 1.2s infinite;
            opacity: 0;
          }
          .animated-ellipsis span:nth-child(1) {
            animation-delay: 0s;
          }
          .animated-ellipsis span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .animated-ellipsis span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes ellipsisPulse {
            0% {
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            60% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
    </main>
  )
}
