(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8000");
async function apiFetch(path, options) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        }
    });
    if (!res.ok) {
        throw new Error("API error");
    }
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/raffle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRaffle",
    ()=>createRaffle,
    "drawEntry",
    ()=>drawEntry,
    "getRaffle",
    ()=>getRaffle,
    "listRaffles",
    ()=>listRaffles,
    "resetRaffle",
    ()=>resetRaffle,
    "updateRaffle",
    ()=>updateRaffle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
function listRaffles() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/raffles");
}
function getRaffle(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/raffles/${id}`);
}
function createRaffle(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/raffles", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}
function updateRaffle(id, payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/raffles/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}
function drawEntry(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/raffles/${id}/draw`, {
        method: "POST"
    });
}
function resetRaffle(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/raffles/${id}/reset`, {
        method: "POST"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/raffle/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RaffleDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lottiefiles$2f$dotlottie$2d$react$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lottiefiles/dotlottie-react/dist/browser/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$raffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/raffle.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const ITEM_HEIGHT = 64;
function RaffleDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const raffleIdParam = params?.id;
    const raffleId = Array.isArray(raffleIdParam) ? raffleIdParam[0] : raffleIdParam;
    const [raffle, setRaffle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingDraw, setLoadingDraw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingReset, setLoadingReset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highlighted, setHighlighted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tickerStep, setTickerStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showDrawOverlay, setShowDrawOverlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [animationPhase, setAnimationPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const drawnListRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [stickToBottom, setStickToBottom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lockBodyScroll, setLockBodyScroll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const previousOverflowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const [currentDrawnInfo, setCurrentDrawnInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const introTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const outroTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clearOverlayTimers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[clearOverlayTimers]": ()=>{
            if (introTimeoutRef.current) {
                clearTimeout(introTimeoutRef.current);
                introTimeoutRef.current = null;
            }
            if (outroTimeoutRef.current) {
                clearTimeout(outroTimeoutRef.current);
                outroTimeoutRef.current = null;
            }
        }
    }["RaffleDetailPage.useCallback[clearOverlayTimers]"], []);
    const remainingEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RaffleDetailPage.useMemo[remainingEntries]": ()=>{
            if (!raffle) return [];
            return raffle.entries.filter({
                "RaffleDetailPage.useMemo[remainingEntries]": (entry)=>entry.drawIndex === undefined || entry.drawIndex === null
            }["RaffleDetailPage.useMemo[remainingEntries]"]);
        }
    }["RaffleDetailPage.useMemo[remainingEntries]"], [
        raffle
    ]);
    const drawnEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RaffleDetailPage.useMemo[drawnEntries]": ()=>{
            if (!raffle) return [];
            return [
                ...raffle.entries
            ].filter({
                "RaffleDetailPage.useMemo[drawnEntries]": (entry)=>entry.drawIndex !== undefined && entry.drawIndex !== null
            }["RaffleDetailPage.useMemo[drawnEntries]"]).sort({
                "RaffleDetailPage.useMemo[drawnEntries]": (a, b)=>(a.drawIndex ?? 0) - (b.drawIndex ?? 0)
            }["RaffleDetailPage.useMemo[drawnEntries]"]);
        }
    }["RaffleDetailPage.useMemo[drawnEntries]"], [
        raffle
    ]);
    const loadRaffle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[loadRaffle]": async ()=>{
            if (!raffleId) return;
            setIsLoading(true);
            setError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$raffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRaffle"])(raffleId);
                setRaffle(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Konnte Raffle nicht laden");
            } finally{
                setIsLoading(false);
            }
        }
    }["RaffleDetailPage.useCallback[loadRaffle]"], [
        raffleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            loadRaffle();
        }
    }["RaffleDetailPage.useEffect"], [
        loadRaffle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            return ({
                "RaffleDetailPage.useEffect": ()=>{
                    clearOverlayTimers();
                }
            })["RaffleDetailPage.useEffect"];
        }
    }["RaffleDetailPage.useEffect"], [
        clearOverlayTimers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const mediaQuery = window.matchMedia("(min-width: 1024px)");
            const handleChange = {
                "RaffleDetailPage.useEffect.handleChange": (event)=>{
                    setLockBodyScroll(event.matches);
                }
            }["RaffleDetailPage.useEffect.handleChange"];
            handleChange(mediaQuery);
            mediaQuery.addEventListener("change", handleChange);
            return ({
                "RaffleDetailPage.useEffect": ()=>{
                    mediaQuery.removeEventListener("change", handleChange);
                }
            })["RaffleDetailPage.useEffect"];
        }
    }["RaffleDetailPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            if (!stickToBottom || !drawnListRef.current) return;
            const list = drawnListRef.current;
            list.scrollTop = list.scrollHeight;
        }
    }["RaffleDetailPage.useEffect"], [
        drawnEntries,
        stickToBottom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            if (typeof document === "undefined") return;
            if (lockBodyScroll) {
                previousOverflowRef.current = document.body.style.overflow;
                document.body.style.overflow = "hidden";
                return ({
                    "RaffleDetailPage.useEffect": ()=>{
                        document.body.style.overflow = previousOverflowRef.current;
                    }
                })["RaffleDetailPage.useEffect"];
            } else {
                document.body.style.overflow = previousOverflowRef.current;
            }
        }
    }["RaffleDetailPage.useEffect"], [
        lockBodyScroll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            setTickerStep(0);
        }
    }["RaffleDetailPage.useEffect"], [
        remainingEntries.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            if (!remainingEntries.length) return;
            const interval = setInterval({
                "RaffleDetailPage.useEffect.interval": ()=>{
                    setTickerStep({
                        "RaffleDetailPage.useEffect.interval": (prev)=>prev + 1
                    }["RaffleDetailPage.useEffect.interval"]);
                }
            }["RaffleDetailPage.useEffect.interval"], 1400);
            return ({
                "RaffleDetailPage.useEffect": ()=>clearInterval(interval)
            })["RaffleDetailPage.useEffect"];
        }
    }["RaffleDetailPage.useEffect"], [
        remainingEntries.length
    ]);
    const setRaffleState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[setRaffleState]": (next)=>{
            setRaffle(next);
            setHighlighted(next.lastDrawnEntryId ?? null);
            const latest = [
                ...next.entries
            ].filter({
                "RaffleDetailPage.useCallback[setRaffleState]": (entry)=>entry.drawIndex !== undefined && entry.drawIndex !== null
            }["RaffleDetailPage.useCallback[setRaffleState]"]).sort({
                "RaffleDetailPage.useCallback[setRaffleState]": (a, b)=>(b.drawIndex ?? 0) - (a.drawIndex ?? 0)
            }["RaffleDetailPage.useCallback[setRaffleState]"])[0];
            if (latest) {
                setCurrentDrawnInfo({
                    label: latest.label,
                    drawIndex: latest.drawIndex ?? null
                });
            } else {
                setCurrentDrawnInfo(null);
            }
            setTimeout({
                "RaffleDetailPage.useCallback[setRaffleState]": ()=>setHighlighted(null)
            }["RaffleDetailPage.useCallback[setRaffleState]"], 3000);
        }
    }["RaffleDetailPage.useCallback[setRaffleState]"], []);
    const startCelebrationSequence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[startCelebrationSequence]": ()=>{
            clearOverlayTimers();
            setShowDrawOverlay(true);
            setAnimationPhase("intro");
            introTimeoutRef.current = setTimeout({
                "RaffleDetailPage.useCallback[startCelebrationSequence]": ()=>{
                    setAnimationPhase("celebration");
                }
            }["RaffleDetailPage.useCallback[startCelebrationSequence]"], 2000);
            outroTimeoutRef.current = setTimeout({
                "RaffleDetailPage.useCallback[startCelebrationSequence]": ()=>{
                    setShowDrawOverlay(false);
                    setAnimationPhase(null);
                }
            }["RaffleDetailPage.useCallback[startCelebrationSequence]"], 6000);
        }
    }["RaffleDetailPage.useCallback[startCelebrationSequence]"], [
        clearOverlayTimers
    ]);
    const stopCelebrationSequence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[stopCelebrationSequence]": ()=>{
            clearOverlayTimers();
            setShowDrawOverlay(false);
            setAnimationPhase(null);
        }
    }["RaffleDetailPage.useCallback[stopCelebrationSequence]"], [
        clearOverlayTimers
    ]);
    const handleDraw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RaffleDetailPage.useCallback[handleDraw]": async ()=>{
            if (!raffle || !remainingEntries.length || loadingDraw) return;
            setLoadingDraw(true);
            setError(null);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$raffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawEntry"])(raffle.id);
                setRaffleState(result.raffle);
                startCelebrationSequence();
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unbekannter Fehler");
                stopCelebrationSequence();
            } finally{
                setLoadingDraw(false);
            }
        }
    }["RaffleDetailPage.useCallback[handleDraw]"], [
        raffle,
        remainingEntries.length,
        loadingDraw,
        setRaffleState,
        startCelebrationSequence,
        stopCelebrationSequence
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RaffleDetailPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const handleKeyDown = {
                "RaffleDetailPage.useEffect.handleKeyDown": (event)=>{
                    if (event.code === "Space" || event.key === " ") {
                        event.preventDefault();
                        if (showDrawOverlay) {
                            stopCelebrationSequence();
                            return;
                        }
                        handleDraw();
                    }
                }
            }["RaffleDetailPage.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "RaffleDetailPage.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["RaffleDetailPage.useEffect"];
        }
    }["RaffleDetailPage.useEffect"], [
        handleDraw,
        showDrawOverlay,
        stopCelebrationSequence
    ]);
    const handleReset = async ()=>{
        if (!raffle) return;
        setLoadingReset(true);
        setError(null);
        try {
            const next = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$raffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetRaffle"])(raffle.id);
            setRaffle(next);
            setHighlighted(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Reset fehlgeschlagen");
        } finally{
            setLoadingReset(false);
        }
    };
    const offset = remainingEntries.length ? tickerStep % remainingEntries.length : 0;
    const translateY = -(offset * ITEM_HEIGHT);
    const tickerEntries = remainingEntries.length ? [
        ...remainingEntries,
        ...remainingEntries
    ] : [];
    const activeTickerEntry = remainingEntries.length ? remainingEntries[offset] : null;
    const handleDrawnListScroll = ()=>{
        if (!drawnListRef.current) return;
        const { scrollTop, clientHeight, scrollHeight } = drawnListRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 8;
        setStickToBottom(isNearBottom);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "jsx-4ac07a480d7532cc" + " " + "min-h-screen bg-gradient-to-b from-white via-[#e9f3ff] to-[#fdfbff] pb-16 lg:h-screen lg:overflow-hidden",
        children: [
            showDrawOverlay && currentDrawnInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-4ac07a480d7532cc" + " " + "fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white/10 backdrop-blur-lg px-6 text-center",
                children: [
                    animationPhase === "intro" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "space-y-4 text-snowblue",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4ac07a480d7532cc" + " " + "text-4xl font-black tracking-[0.3em]",
                                children: [
                                    "#",
                                    currentDrawnInfo.drawIndex ?? "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 229,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-4ac07a480d7532cc" + " " + "text-xl uppercase tracking-[0.4em] text-slate-500",
                                children: [
                                    "Das nächste Team ist",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "animated-ellipsis",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-4ac07a480d7532cc",
                                                children: "."
                                            }, void 0, false, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-4ac07a480d7532cc",
                                                children: "."
                                            }, void 0, false, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-4ac07a480d7532cc",
                                                children: "."
                                            }, void 0, false, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 232,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 228,
                        columnNumber: 13
                    }, this),
                    animationPhase === "celebration" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "relative w-full -translate-y-16 lg:-translate-y-24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lottiefiles$2f$dotlottie$2d$react$2f$dist$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DotLottieReact"], {
                                src: "https://lottie.host/958c7179-b9bd-41b5-b725-8f2b15c2ddcb/OaxiZTrcyb.lottie",
                                loop: true,
                                autoplay: true,
                                className: "mx-auto w-[70%] lg:w-[65%]"
                            }, void 0, false, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 244,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4ac07a480d7532cc" + " " + "z-50 pointer-events-none absolute inset-0 flex items-center justify-center text-center translate-y-16 lg:translate-y-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-4ac07a480d7532cc" + " " + "rounded-3xl text-5xl font-extrabold uppercase tracking-[0.4em] text-snowblue drop-shadow-2xl",
                                    children: [
                                        "#",
                                        currentDrawnInfo.drawIndex ?? "-",
                                        " ",
                                        currentDrawnInfo.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/raffle/[id]/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 243,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/raffle/[id]/page.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-4ac07a480d7532cc" + " " + "mx-auto max-w-6xl px-4 pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "flex flex-wrap items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4ac07a480d7532cc",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-2 text-3xl font-semibold text-snowblue",
                                        children: raffle ? raffle.name : isLoading ? "Lade…" : "Unbekanntes Raffle"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this),
                                    raffle?.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "text-sm text-slate-500",
                                        children: raffle.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4ac07a480d7532cc" + " " + "flex flex-wrap gap-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "rounded-full border border-snowblue/30 px-4 py-2 text-snowblue hover:border-snowblue",
                                        children: "Zur Übersicht"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleReset,
                                        disabled: !raffle || loadingReset,
                                        className: "jsx-4ac07a480d7532cc" + " " + "rounded-full border border-snowblue/40 px-4 py-2 text-snowblue transition hover:border-snowblue disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300",
                                        children: loadingReset ? "Setze zurück…" : "Topf leeren"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDraw,
                                        disabled: !raffle || !remainingEntries.length || loadingDraw,
                                        className: "jsx-4ac07a480d7532cc" + " " + "rounded-full bg-snowblue px-5 py-2 font-semibold text-white transition hover:bg-snowblue/90 disabled:cursor-not-allowed disabled:bg-slate-300",
                                        children: loadingDraw ? "Ziehe…" : remainingEntries.length ? "Team ziehen " : "Alles gezogen"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "mt-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this),
                    !raffle && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "mt-10 rounded-3xl border border-dashed border-snowred/30 bg-white/70 p-6 text-center text-slate-500",
                        children: [
                            "Raffle wurde nicht gefunden. ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-snowblue underline",
                                children: "Zurück zur Übersicht"
                            }, void 0, false, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 296,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this),
                    raffle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4ac07a480d7532cc" + " " + "mt-10 grid gap-8 lg:grid-cols-2 lg:h-[calc(100vh-220px)] lg:min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-4ac07a480d7532cc" + " " + "rounded-3xl bg-white/80 p-6 shadow-2xl shadow-snowblue/10 lg:min-h-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "text-sm uppercase tracking-[0.3em] text-slate-400",
                                        children: "Im Lostopf"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-2 text-2xl font-semibold text-slate-800",
                                        children: [
                                            remainingEntries.length,
                                            " verbleibend"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this),
                                    remainingEntries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-4ac07a480d7532cc" + " " + "mt-4 rounded-3xl bg-gradient-to-br from-snowblue/10 via-white to-white p-6 shadow-inner",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-4ac07a480d7532cc" + " " + "text-xs uppercase tracking-[0.4em] text-snowblue/80",
                                                        children: "Zufalls Auswahl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-2 text-3xl font-bold text-snowblue",
                                                        children: activeTickerEntry?.label ?? "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: ITEM_HEIGHT * 3
                                                },
                                                className: "jsx-4ac07a480d7532cc" + " " + "mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white/70",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        transform: `translateY(${translateY}px)`,
                                                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                                                    },
                                                    className: "jsx-4ac07a480d7532cc" + " " + "ticker-track",
                                                    children: tickerEntries.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-4ac07a480d7532cc" + " " + "flex h-16 items-center justify-between border-b border-slate-100 px-4 text-slate-600 last:border-none",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-4ac07a480d7532cc",
                                                                    children: entry.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/raffle/[id]/page.tsx",
                                                                    lineNumber: 328,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-4ac07a480d7532cc" + " " + "text-xs text-slate-400",
                                                                    children: "Im Topf"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/raffle/[id]/page.tsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, `${entry.id}-${index}`, true, {
                                                            fileName: "[project]/app/raffle/[id]/page.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/raffle/[id]/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-6 rounded-3xl border border-dashed border-snowblue/40 bg-white/70 p-6 text-center text-slate-500",
                                        children: "Alle Teams wurden gezogen. Du kannst oben eine neue Runde starten."
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-4ac07a480d7532cc" + " " + "rounded-3xl bg-white/85 p-6 shadow-xl shadow-snowblue/10 flex flex-col lg:min-h-0 lg:overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "text-sm uppercase tracking-[0.3em] text-slate-400",
                                        children: "Gezogene Teams"
                                    }, void 0, false, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-2 text-2xl font-semibold text-slate-800",
                                        children: [
                                            drawnEntries.length,
                                            " vergeben"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        ref: drawnListRef,
                                        onScroll: handleDrawnListScroll,
                                        className: "jsx-4ac07a480d7532cc" + " " + "mt-4 space-y-3 overflow-y-auto pr-2 flex-1 lg:min-h-0",
                                        children: [
                                            drawnEntries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-4ac07a480d7532cc" + " " + "rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-slate-500",
                                                children: "Noch kein Team gezogen."
                                            }, void 0, false, {
                                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            drawnEntries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "jsx-4ac07a480d7532cc" + " " + `flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 text-sm ${highlighted === entry.id ? "bg-snowyellow/50" : "bg-white"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-4ac07a480d7532cc" + " " + "font-semibold text-slate-700",
                                                            children: [
                                                                "#",
                                                                entry.drawIndex,
                                                                " – ",
                                                                entry.label
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/raffle/[id]/page.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-4ac07a480d7532cc" + " " + "text-xs text-slate-400",
                                                            children: entry.drawnAt ? new Date(entry.drawnAt).toLocaleTimeString("de-CH", {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            }) : ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/raffle/[id]/page.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, entry.id, true, {
                                                    fileName: "[project]/app/raffle/[id]/page.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/raffle/[id]/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/raffle/[id]/page.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/raffle/[id]/page.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/raffle/[id]/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "4ac07a480d7532cc",
                children: ".animated-ellipsis.jsx-4ac07a480d7532cc{letter-spacing:.2em;margin-left:.4rem;display:inline-flex}.animated-ellipsis.jsx-4ac07a480d7532cc span.jsx-4ac07a480d7532cc{opacity:0;animation:1.2s infinite ellipsisPulse}.animated-ellipsis.jsx-4ac07a480d7532cc span.jsx-4ac07a480d7532cc:first-child{animation-delay:0s}.animated-ellipsis.jsx-4ac07a480d7532cc span.jsx-4ac07a480d7532cc:nth-child(2){animation-delay:.2s}.animated-ellipsis.jsx-4ac07a480d7532cc span.jsx-4ac07a480d7532cc:nth-child(3){animation-delay:.4s}@keyframes ellipsisPulse{0%{opacity:0}30%{opacity:1}60%{opacity:1}to{opacity:0}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/raffle/[id]/page.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
_s(RaffleDetailPage, "EP9a+/fTbIgpDJ0Veg2CRhP5DDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = RaffleDetailPage;
var _c;
__turbopack_context__.k.register(_c, "RaffleDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_be878f7c._.js.map