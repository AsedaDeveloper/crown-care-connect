import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, X } from "lucide-react";
import { fetchRecentJoins, relativeTime, type RecentJoin } from "@/lib/activity";

/**
 * Anonymous social-proof popups driven by REAL waitlist signups.
 *
 * Honesty rules:
 *  - Only shows if there are genuinely people on the waitlist.
 *  - Never invents names or locations.
 *  - Only claims a time ("2 hours ago") when the row has a real timestamp.
 */

const FIRST_DELAY_MS = 8000;
const GAP_MS = 32000;
const VISIBLE_MS = 5000;

const ActivityPopups = () => {
  const [joins, setJoins] = useState<RecentJoin[]>([]);
  const [current, setCurrent] = useState<RecentJoin | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchRecentJoins().then(setJoins);
  }, []);

  useEffect(() => {
    if (dismissed || joins.length === 0) return;
    let i = 0;
    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      setCurrent(joins[i % joins.length]);
      i += 1;
      hideTimer = setTimeout(() => setCurrent(null), VISIBLE_MS);
    };

    const first = setTimeout(show, FIRST_DELAY_MS);
    const loop = setInterval(show, GAP_MS);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, [joins, dismissed]);

  if (dismissed) return null;

  const when = relativeTime(current?.created_at);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={`act-${current.id}`}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-20 left-4 sm:left-5 z-40 max-w-[calc(100vw-2rem)]"
        >
          <div className="flex items-center gap-3 rounded-full bg-card border border-border shadow-lg pl-3 pr-2 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Crown size={13} className="text-primary" />
            </span>
            <p className="text-xs text-foreground whitespace-nowrap">
              Someone joined the community
              {when ? <span className="text-muted-foreground"> · {when}</span> : null}
            </p>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityPopups;
