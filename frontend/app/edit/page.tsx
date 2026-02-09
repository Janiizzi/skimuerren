"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { createRaffle, listRaffles, updateRaffle } from "@/lib/api/raffle"
import { Raffle, RaffleEntryPayload } from "@/types/raffle"

type DraftEntry = {
  key: string
  label: string
  imageUrl: string
  id?: string
}

const draftKey = () => {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

const newEntry = (entry?: Partial<DraftEntry>) => ({
  key: entry?.key ?? draftKey(),
  label: entry?.label ?? "",
  imageUrl: entry?.imageUrl ?? "",
  id: entry?.id,
})

const EditPage = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [form, setForm] = useState({ name: "", description: "" })
  const [entries, setEntries] = useState<DraftEntry[]>([newEntry()])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasValidEntries = useMemo(() => entries.some((entry) => entry.label.trim().length > 0), [entries])

  const loadRaffles = useCallback(() => {
    listRaffles().then(setRaffles).catch(() => setError("Konnte bestehende Raffles nicht laden"))
  }, [])

  useEffect(() => {
    loadRaffles()
  }, [loadRaffles])

  const resetForm = () => {
    setForm({ name: "", description: "" })
    setEntries([newEntry()])
    setEditingId(null)
    setMessage(null)
    setError(null)
  }

  const handleEntryChange = (key: string, field: "label" | "imageUrl", value: string) => {
    setEntries((prev) => prev.map((entry) => (entry.key === key ? { ...entry, [field]: value } : entry)))
  }

  const addEntryRow = () => setEntries((prev) => [...prev, newEntry()])

  const removeEntryRow = (key: string) => {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((entry) => entry.key !== key)))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    if (!hasValidEntries) {
      setError("Bitte mindestens einen Namen hinzufügen.")
      return
    }

    const payloadEntries: RaffleEntryPayload[] = entries
      .filter((entry) => entry.label.trim().length > 0)
      .map((entry) => ({
        id: entry.id,
        label: entry.label.trim(),
        imageUrl: entry.imageUrl.trim() || undefined,
      }))

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      entries: payloadEntries,
    }

    if (!payload.name) {
      setError("Bitte einen Namen für das Raffle vergeben.")
      return
    }

    setLoading(true)
    try {
      if (editingId) {
        await updateRaffle(editingId, payload)
        setMessage("Raffle aktualisiert ✨")
      } else {
        await createRaffle(payload)
        setMessage("Raffle erstellt ❄️")
        resetForm()
      }
      loadRaffles()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konnte nicht speichern")
    } finally {
      setLoading(false)
    }
  }

  const startEditing = (raffle: Raffle) => {
    setMessage(null)
    setError(null)
    setEditingId(raffle.id)
    setForm({ name: raffle.name, description: raffle.description ?? "" })
    setEntries(raffle.entries.map((entry) => newEntry(entry)))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#e9f3ff] to-[#fdfbff] pb-16">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 rounded-3xl bg-white/80 p-6 shadow-xl shadow-snowblue/10 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Editor</p>
          <h1 className="mt-2 text-3xl font-semibold text-snowblue">
            {editingId ? "Raffle bearbeiten" : "Neues Raffle erstellen"}
          </h1>
          {editingId && (
            <button className="mt-3 text-sm text-snowblue underline" onClick={resetForm}>
              Bearbeitung abbrechen
            </button>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white/80 p-6 shadow-lg shadow-snowblue/10 backdrop-blur">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-600">
              Titel
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-base focus:border-snowblue focus:outline-none"
                placeholder="z. B. Skilehrer-Team"
                required
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-600">
              Beschreibung
              <input
                type="text"
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-base focus:border-snowblue focus:outline-none"
                placeholder="Optional"
              />
            </label>
          </div>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-700">Teilnehmer:innen</h2>
              <button type="button" onClick={addEntryRow} className="rounded-full border border-dashed border-snowblue/50 px-4 py-1 text-sm text-snowblue">
                + Person
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {entries.map((entry) => (
                <div key={entry.key} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:flex-row">
                  <input
                    type="text"
                    value={entry.label}
                    onChange={(event) => handleEntryChange(entry.key, "label", event.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-snowblue focus:outline-none"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={entry.imageUrl}
                    onChange={(event) => handleEntryChange(entry.key, "imageUrl", event.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-snowblue focus:outline-none"
                    placeholder="Bild-URL (optional)"
                  />
                  <button type="button" onClick={() => removeEntryRow(entry.key)} className="text-sm text-snowred disabled:text-slate-300" disabled={entries.length === 1}>
                    Entfernen
                  </button>
                </div>
              ))}
            </div>
          </section>

          {error && <div className="rounded-2xl border border-red-200 bg-red-50/70 p-3 text-sm text-red-600">{error}</div>}
          {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 text-sm text-emerald-700">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-snowblue py-3 text-lg font-semibold text-white transition hover:bg-snowblue/90 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "Speichere…" : editingId ? "Raffle aktualisieren" : "Raffle speichern"}
          </button>
        </form>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-700">Bestehende Raffles</h2>
            <Link href="/" className="text-sm text-snowblue underline">
              Zur Auslosung
            </Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {raffles.map((raffle) => (
              <div key={raffle.id} className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{raffle.name}</h3>
                    <p className="text-sm text-slate-500">{raffle.entries.length} Namen</p>
                  </div>
                  <button className="text-sm text-snowblue underline" onClick={() => startEditing(raffle)}>
                    Bearbeiten
                  </button>
                </div>
                {raffle.lastDrawnEntryId && raffle.lastDrawnAt && (
                  <p className="mt-2 text-xs text-slate-500">
                    Letzte Ziehung: {new Date(raffle.lastDrawnAt).toLocaleString("de-CH", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
            ))}
            {!raffles.length && (
              <div className="rounded-3xl border border-dashed border-snowblue/30 bg-white/70 p-6 text-center text-slate-500">
                Noch kein Raffle vorhanden.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default EditPage