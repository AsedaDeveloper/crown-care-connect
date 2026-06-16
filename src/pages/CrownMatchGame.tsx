import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Star, ArrowLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";


/* ---------------- Tile config ---------------- */
const TILE_TYPES = [
  { id: 1, name: "Coconut Oil",     emoji: "🥥", bg: "hsl(45 90% 60%)",  fact: "Coconut oil actually penetrates the hair shaft — most oils just coat the outside!" },
  { id: 2, name: "Shea Butter",     emoji: "🧈", bg: "hsl(40 50% 80%)",  fact: "Shea butter seals moisture into your hair strand and protects it from drying out." },
  { id: 3, name: "Water Drop",      emoji: "💧", bg: "hsl(205 85% 55%)", fact: "Water is the only true moisturiser for natural hair — everything else just helps seal it in!" },
  { id: 4, name: "Detangling Comb", emoji: "🪮", bg: "hsl(270 50% 55%)", fact: "Always detangle from your ends up to your roots — never root to tip — to prevent breakage." },
  { id: 5, name: "Aloe Vera",       emoji: "🌿", bg: "hsl(140 55% 45%)", fact: "Aloe vera balances your scalp pH which reduces itchiness and flaking." },
  { id: 6, name: "Scissors",        emoji: "✂️", bg: "hsl(20 90% 55%)",  fact: "Trimming split ends every 8 to 12 weeks stops breakage travelling up the hair strand." },
];

const ROWS = 8;
const COLS = 7;

/* ---------------- Levels ---------------- */
type Level = {
  number: number;
  title: string;
  goalLabel: string;
  type: "matchType" | "matchTwoTypes" | "matchInTime" | "chains" | "clearBoard";
  targets?: { typeId: number; count: number }[];
  totalCount?: number;
  timeLimit?: number;
  chainsRequired?: number;
  fact: string;
};

const LEVELS: Level[] = [
  { number: 1, title: "Hydration Foundations",  goalLabel: "Match 10 Water Drops",                       type: "matchType",     targets: [{ typeId: 3, count: 10 }],                              fact: "Water is the foundation of all natural hair care. Without it, no other product works. Spritz daily." },
  { number: 2, title: "The LOC Method",          goalLabel: "Match 8 Coconut Oils & 8 Shea Butters",      type: "matchTwoTypes", targets: [{ typeId: 1, count: 8 }, { typeId: 2, count: 8 }],      fact: "The LOC method = Liquid, Oil, Cream. Water hydrates, oil seals, cream locks. This order matters." },
  { number: 3, title: "Speed Run",               goalLabel: "Match 15 tiles in 60 seconds",                type: "matchInTime",   totalCount: 15, timeLimit: 60,                                    fact: "Consistency beats intensity. Five small habits repeated weekly do more than one perfect wash day." },
  { number: 4, title: "Chain Reactions",         goalLabel: "Create 3 chain reactions",                    type: "chains",        chainsRequired: 3,                                                fact: "Layering products is like building chains: each one helps the next work better." },
  { number: 5, title: "Full Crown Challenge",    goalLabel: "Clear the entire board",                      type: "clearBoard",                                                                      fact: "Mastering your hair takes time. Trust the process — your crown rewards patience." },
];

/* ---------------- Sound (Web Audio) ---------------- */
class SoundEngine {
  ctx: AudioContext | null = null;
  enabled = true;
  ensure() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch {}
    }
  }
  beep(freq: number, dur = 0.12, type: OscillatorType = "sine", vol = 0.18) {
    if (!this.enabled) return;
    this.ensure();
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start();
    o.stop(this.ctx.currentTime + dur);
  }
  swap()    { this.beep(440, 0.08, "triangle"); }
  match()   { this.beep(660, 0.12, "sine"); setTimeout(() => this.beep(880, 0.12, "sine"), 80); }
  chain()   { this.beep(523, 0.1); setTimeout(() => this.beep(659, 0.1), 90); setTimeout(() => this.beep(784, 0.15), 180); }
  invalid() { this.beep(180, 0.15, "sawtooth", 0.1); }
  win()     { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.beep(f, 0.2, "triangle", 0.2), i * 100)); }
  lose()    { [400, 300, 200].forEach((f, i) => setTimeout(() => this.beep(f, 0.2, "sawtooth", 0.15), i * 120)); }
}
const sound = new SoundEngine();

/* ---------------- Board logic ---------------- */
type Cell = { type: number; key: string };
const randType = () => Math.floor(Math.random() * TILE_TYPES.length) + 1;
const newKey = () => Math.random().toString(36).slice(2, 9);

const makeBoard = (): Cell[][] => {
  const b: Cell[][] = [];
  for (let r = 0; r < ROWS; r++) {
    b[r] = [];
    for (let c = 0; c < COLS; c++) {
      let t: number;
      do {
        t = randType();
      } while (
        (c >= 2 && b[r][c - 1].type === t && b[r][c - 2].type === t) ||
        (r >= 2 && b[r - 1][c].type === t && b[r - 2][c].type === t)
      );
      b[r][c] = { type: t, key: newKey() };
    }
  }
  return b;
};

const findMatches = (b: Cell[][]): boolean[][] => {
  const marks: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  // horizontal
  for (let r = 0; r < ROWS; r++) {
    let run = 1;
    for (let c = 1; c <= COLS; c++) {
      const same = c < COLS && b[r][c] && b[r][c - 1] && b[r][c].type === b[r][c - 1].type;
      if (same) run++;
      else {
        if (run >= 3) for (let k = 0; k < run; k++) marks[r][c - 1 - k] = true;
        run = 1;
      }
    }
  }
  // vertical
  for (let c = 0; c < COLS; c++) {
    let run = 1;
    for (let r = 1; r <= ROWS; r++) {
      const same = r < ROWS && b[r][c] && b[r - 1][c] && b[r][c].type === b[r - 1][c].type;
      if (same) run++;
      else {
        if (run >= 3) for (let k = 0; k < run; k++) marks[r - 1 - k][c] = true;
        run = 1;
      }
    }
  }
  return marks;
};

const countCleared = (marks: boolean[][]) => marks.flat().filter(Boolean).length;

// Group matches into runs to score by run-length and detect type counts
const analyseMatches = (b: Cell[][], marks: boolean[][]) => {
  const runs: { type: number; len: number }[] = [];
  // horizontal runs
  for (let r = 0; r < ROWS; r++) {
    let c = 0;
    while (c < COLS) {
      if (marks[r][c]) {
        let len = 1;
        const t = b[r][c].type;
        while (c + len < COLS && marks[r][c + len] && b[r][c + len].type === t) len++;
        if (len >= 3) runs.push({ type: t, len });
        c += len;
      } else c++;
    }
  }
  // vertical runs (only if cell wasn't already part of a horizontal run captured? we still score per axis)
  for (let c = 0; c < COLS; c++) {
    let r = 0;
    while (r < ROWS) {
      if (marks[r][c]) {
        let len = 1;
        const t = b[r][c].type;
        while (r + len < ROWS && marks[r + len][c] && b[r + len][c].type === t) len++;
        if (len >= 3) runs.push({ type: t, len });
        r += len;
      } else r++;
    }
  }
  // type counts (each cleared cell counted once)
  const typeCounts: Record<number, number> = {};
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (marks[r][c]) typeCounts[b[r][c].type] = (typeCounts[b[r][c].type] || 0) + 1;
  return { runs, typeCounts };
};

const applyGravity = (b: Cell[][], marks: boolean[][]): Cell[][] => {
  const next: Cell[][] = b.map((row) => row.map((c) => ({ ...c })));
  for (let c = 0; c < COLS; c++) {
    const stack: Cell[] = [];
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!marks[r][c]) stack.push(next[r][c]);
    }
    while (stack.length < ROWS) stack.push({ type: randType(), key: newKey() });
    // place from bottom up
    for (let r = ROWS - 1, i = 0; r >= 0; r--, i++) next[r][c] = stack[i];
  }
  return next;
};

const isAdjacent = (a: [number, number], b: [number, number]) =>
  (a[0] === b[0] && Math.abs(a[1] - b[1]) === 1) || (a[1] === b[1] && Math.abs(a[0] - b[0]) === 1);

const swap = (b: Cell[][], a: [number, number], c: [number, number]): Cell[][] => {
  const next = b.map((row) => row.slice());
  const tmp = next[a[0]][a[1]];
  next[a[0]][a[1]] = next[c[0]][c[1]];
  next[c[0]][c[1]] = tmp;
  return next;
};

/* ---------------- Game component ---------------- */
const CrownMatchGame = () => {
  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];
  const [board, setBoard] = useState<Cell[][]>(() => makeBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);
  const [timeLeft, setTimeLeft] = useState<number>(level.timeLimit ?? 0);
  const [progress, setProgress] = useState<{ typeCounts: Record<number, number>; chains: number; cleared: number }>({ typeCounts: {}, chains: 0, cleared: 0 });
  const [banner, setBanner] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(false);
  const [phase, setPhase] = useState<"playing" | "won" | "lost">("playing");
  const bannerTimer = useRef<number | null>(null);

  useEffect(() => { sound.enabled = !muted; }, [muted]);

  // Reset when level changes
  const resetLevel = useCallback(() => {
    setBoard(makeBoard());
    setScore(0);
    setMoves(20);
    setTimeLeft(level.timeLimit ?? 0);
    setProgress({ typeCounts: {}, chains: 0, cleared: 0 });
    setBanner(null);
    setSelected(null);
    setBusy(false);
    setPhase("playing");
  }, [level]);

  useEffect(() => { resetLevel(); }, [levelIdx]); // eslint-disable-line

  // Timer for timed levels
  useEffect(() => {
    if (level.type !== "matchInTime" || phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase(progress.cleared >= (level.totalCount ?? 0) ? "won" : "lost");
      sound.lose();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, level, phase, progress.cleared]);

  // Show fact banner
  const showBanner = (text: string) => {
    setBanner(text);
    if (bannerTimer.current) window.clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => setBanner(null), 2000);
  };

  // Score per run
  const runScore = (len: number) => (len >= 5 ? 500 : len >= 4 ? 250 : 100);

  // Check goal completion
  const checkGoal = (p: typeof progress) => {
    switch (level.type) {
      case "matchType":
      case "matchTwoTypes":
        return level.targets!.every((t) => (p.typeCounts[t.typeId] ?? 0) >= t.count);
      case "matchInTime":
        return p.cleared >= (level.totalCount ?? 0);
      case "chains":
        return p.chains >= (level.chainsRequired ?? 0);
      case "clearBoard":
        return p.cleared >= ROWS * COLS * 0.6; // 60% cleared treated as cleared (continuous board)
    }
  };

  // Resolve cascades
  const resolve = async (startBoard: Cell[][]) => {
    setBusy(true);
    let current = startBoard;
    let chainDepth = 0;
    let p = { ...progress };
    let s = score;
    while (true) {
      const marks = findMatches(current);
      const cleared = countCleared(marks);
      if (cleared === 0) break;
      const { runs, typeCounts } = analyseMatches(current, marks);
      const baseScore = runs.reduce((acc, r) => acc + runScore(r.len), 0);
      const gained = chainDepth > 0 ? baseScore * 2 : baseScore;
      s += gained;

      // pick a fact from largest run's type
      const biggest = runs.sort((a, b) => b.len - a.len)[0];
      if (biggest) {
        const tile = TILE_TYPES.find((t) => t.id === biggest.type);
        if (tile) showBanner(tile.fact);
      }

      // update progress
      Object.entries(typeCounts).forEach(([k, v]) => {
        p.typeCounts[Number(k)] = (p.typeCounts[Number(k)] || 0) + v;
      });
      p.cleared += cleared;
      if (chainDepth > 0) p.chains += 1;

      if (chainDepth > 0) sound.chain(); else sound.match();

      setScore(s);
      // animate clear: render a cleared state briefly
      const cleared_board = current.map((row, r) => row.map((cell, c) => marks[r][c] ? { ...cell, type: 0 } : cell));
      setBoard(cleared_board);
      await new Promise((r) => setTimeout(r, 220));

      current = applyGravity(current, marks);
      setBoard(current);
      await new Promise((r) => setTimeout(r, 280));

      chainDepth++;
    }
    setProgress(p);
    setBusy(false);

    if (checkGoal(p)) {
      setPhase("won");
      sound.win();
    } else if (level.type !== "matchInTime" && moves <= 0) {
      setPhase("lost");
      sound.lose();
    }
  };

  // Tile click
  const onTile = async (r: number, c: number) => {
    if (busy || phase !== "playing") return;
    if (!selected) {
      setSelected([r, c]);
      return;
    }
    if (selected[0] === r && selected[1] === c) {
      setSelected(null);
      return;
    }
    if (!isAdjacent(selected, [r, c])) {
      setSelected([r, c]);
      return;
    }
    const a = selected;
    const b: [number, number] = [r, c];
    setSelected(null);
    setBusy(true);
    sound.swap();
    const swapped = swap(board, a, b);
    setBoard(swapped);
    await new Promise((res) => setTimeout(res, 200));
    const marks = findMatches(swapped);
    if (countCleared(marks) === 0) {
      // revert
      sound.invalid();
      const reverted = swap(swapped, a, b);
      setBoard(reverted);
      await new Promise((res) => setTimeout(res, 200));
      setBusy(false);
      return;
    }
    if (level.type !== "matchInTime") setMoves((m) => m - 1);
    await resolve(swapped);
  };

  // Lose check on moves
  useEffect(() => {
    if (phase !== "playing") return;
    if (level.type !== "matchInTime" && moves <= 0 && !busy) {
      // Allow last cascade to determine
      if (!checkGoal(progress)) {
        setPhase("lost");
        sound.lose();
      }
    }
  }, [moves, busy, phase, progress, level.type]);

  /* ---------------- Render ---------------- */
  const stars = useMemo(() => (score >= 2500 ? 3 : score >= 1200 ? 2 : 1), [score]);
  const goalText = useMemo(() => {
    if (level.type === "matchType" || level.type === "matchTwoTypes") {
      return level.targets!
        .map((t) => `${Math.min(progress.typeCounts[t.typeId] ?? 0, t.count)}/${t.count} ${TILE_TYPES.find((tt) => tt.id === t.typeId)?.emoji}`)
        .join("  ·  ");
    }
    if (level.type === "matchInTime") return `${progress.cleared}/${level.totalCount} matched`;
    if (level.type === "chains") return `${progress.chains}/${level.chainsRequired} chains`;
    return `${progress.cleared} tiles cleared`;
  }, [level, progress]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, hsl(150 60% 12%) 0%, hsl(150 50% 18%) 100%)" }}>
      <Seo
        title="Crown Match — Hair Care Game"
        description="Play Crown Match, a hair-care themed match-3 game. Match coconut oil, shea butter, and water to learn natural hair tips as you score."
        path="/game"
      />
      <Navbar />


      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="text-amber-300 inline-flex items-center gap-1 text-sm hover:underline">
              <ArrowLeft size={14} /> Home
            </Link>
            <div className="flex items-center gap-2 text-amber-300 font-serif">
              <Crown size={20} /> Crown Match
            </div>
            <button onClick={() => setMuted((m) => !m)} className="text-amber-300 p-1" aria-label="Toggle sound">
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Top bar */}
          <div className="grid grid-cols-3 items-center bg-emerald-950/60 border border-amber-400/30 rounded-2xl p-3 mb-3 text-amber-100">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-400/80">Score</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/80">Level</p>
              <p className="text-xl font-bold">{level.number}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/80">{level.type === "matchInTime" ? "Time" : "Moves"}</p>
              <p className="text-xl font-bold">{level.type === "matchInTime" ? `${timeLeft}s` : moves}</p>
            </div>
          </div>

          {/* Goal */}
          <div className="text-center mb-3">
            <p className="text-amber-200/80 text-xs uppercase tracking-widest">{level.title}</p>
            <p className="text-amber-100 text-sm">{level.goalLabel}</p>
            <p className="text-amber-300 text-sm font-semibold mt-1">{goalText}</p>
          </div>

          {/* Banner */}
          <div className="h-12 mb-2">
            <AnimatePresence>
              {banner && (
                <motion.div
                  key={banner}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-amber-400 text-emerald-950 text-xs font-medium rounded-xl px-3 py-2 shadow-lg text-center"
                >
                  {banner}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Board */}
          <div
            className="grid gap-1 bg-emerald-950/60 p-2 rounded-2xl border border-amber-400/30 select-none"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const isSel = selected && selected[0] === r && selected[1] === c;
                const tile = TILE_TYPES.find((t) => t.id === cell.type);
                return (
                  <motion.button
                    key={cell.key}
                    onClick={() => onTile(r, c)}
                    layout
                    whileTap={{ scale: 0.92 }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-sm transition-all ${
                      isSel ? "ring-2 ring-amber-300 scale-105 shadow-amber-300/50" : ""
                    }`}
                    style={{ background: tile ? tile.bg : "transparent" }}
                    aria-label={tile?.name ?? "empty"}
                  >
                    <AnimatePresence>
                      {tile && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {tile.emoji}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" onClick={resetLevel} className="bg-emerald-950/60 text-amber-200 border-amber-400/30 hover:bg-emerald-900">
              <RotateCcw size={14} /> Restart Level
            </Button>
          </div>
        </div>

        {/* Win / Lose modal */}
        <AnimatePresence>
          {phase !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-amber-400/40 rounded-3xl p-6 max-w-sm w-full text-center text-amber-100"
              >
                {phase === "won" ? (
                  <>
                    <Crown className="text-amber-300 mx-auto mb-2" size={48} />
                    <h2 className="text-2xl font-serif text-amber-300 mb-1">Level Complete!</h2>
                    <div className="flex justify-center gap-1 my-3">
                      {[1, 2, 3].map((i) => (
                        <Star key={i} size={28} className={i <= stars ? "text-amber-300 fill-amber-300" : "text-amber-300/30"} />
                      ))}
                    </div>
                    <p className="text-sm text-amber-100/90 bg-emerald-950/60 rounded-xl p-3 my-3">{level.fact}</p>
                    <p className="text-xs text-amber-200/80 mb-4">Score: {score}</p>
                    <div className="flex flex-col gap-2">
                      {levelIdx < LEVELS.length - 1 ? (
                        <Button onClick={() => setLevelIdx((i) => i + 1)} className="bg-amber-400 text-emerald-950 hover:bg-amber-300">
                          Next Level
                        </Button>
                      ) : (
                        <Button onClick={() => setLevelIdx(0)} className="bg-amber-400 text-emerald-950 hover:bg-amber-300">
                          Play Again
                        </Button>
                      )}
                      <Link to="/tips">
                        <Button variant="outline" className="w-full bg-transparent border-amber-400/40 text-amber-200 hover:bg-emerald-900">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif text-amber-300 mb-2">Out of {level.type === "matchInTime" ? "time" : "moves"}!</h2>
                    <p className="text-sm text-amber-100/90 mb-4">Your crown needs another try 👑</p>
                    <Button onClick={resetLevel} className="bg-amber-400 text-emerald-950 hover:bg-amber-300 w-full">
                      Try Again
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default CrownMatchGame;
