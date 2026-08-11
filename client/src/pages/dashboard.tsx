import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Sunrise,
  Briefcase,
  LogOut,
  Moon,
  Plus,
  X,
  ListTodo,
  Clock,
  NotebookPen,
} from "lucide-react";

// SHA-256 of the dashboard password — the plaintext never ships in the bundle.
const PASS_HASH =
  "5088bb785134e1fe267c543f9a461c65d57d5efa5271c1fe68192821d3d7c7a2";
const AUTH_COOKIE = "pd_auth";

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return match ? match.slice(name.length + 1) : null;
}

function setAuthCookie(value: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${AUTH_COOKIE}=${value}; max-age=${oneYear}; path=/; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; max-age=0; path=/`;
}

type TaskItem = { text: string; done: boolean };

type Rituals = {
  morning: boolean;
  workStart: boolean;
  workEnd: boolean;
  night: boolean;
};

type DayData = {
  mainTasks: TaskItem[];
  otherTasks: TaskItem[];
  timeLog: Record<string, string>;
  notes: string;
  win: string;
  rituals: Rituals;
};

const emptyDay = (): DayData => ({
  mainTasks: [
    { text: "", done: false },
    { text: "", done: false },
    { text: "", done: false },
  ],
  otherTasks: [],
  timeLog: {},
  notes: "",
  win: "",
  rituals: { morning: false, workStart: false, workEnd: false, night: false },
});

const storageKey = (date: string) => `planner:${date}`;

function loadDay(date: string): DayData {
  try {
    const raw = localStorage.getItem(storageKey(date));
    if (!raw) return emptyDay();
    return { ...emptyDay(), ...JSON.parse(raw) };
  } catch {
    return emptyDay();
  }
}

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shiftDate(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(y, m - 1, d + days);
  return localDateKey(next);
}

function formatDisplayDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// 15-minute blocks from 6:30 AM through 10:30 PM
const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let mins = 6 * 60 + 30; mins < 22 * 60 + 30; mins += 15) {
    const h24 = Math.floor(mins / 60);
    const mm = String(mins % 60).padStart(2, "0");
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    slots.push(`${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`);
  }
  return slots;
})();

const RITUALS: { key: keyof Rituals; label: string; icon: typeof Sunrise }[] = [
  { key: "morning", label: "Morning ritual", icon: Sunrise },
  { key: "workStart", label: "Work start ritual", icon: Briefcase },
  { key: "workEnd", label: "Work end ritual", icon: LogOut },
  { key: "night", label: "Night ritual", icon: Moon },
];

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Clock;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-accent" />
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      )}
    </div>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    const hash = await sha256Hex(password);
    setChecking(false);
    if (hash === PASS_HASH) {
      setAuthCookie(hash);
      onUnlock();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="w-full max-w-sm p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Private Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the password to continue
          </p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <Input
            type="password"
            autoFocus
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            data-testid="input-password"
          />
          {error && (
            <p className="text-sm text-destructive" data-testid="text-password-error">
              Incorrect password. Try again.
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={checking || password.length === 0}
            data-testid="button-unlock"
          >
            Unlock
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Planner({ onLock }: { onLock: () => void }) {
  const today = localDateKey(new Date());
  const [date, setDate] = useState(today);
  const [data, setData] = useState<DayData>(() => loadDay(today));
  const skipSave = useRef(true);

  const changeDate = (next: string) => {
    skipSave.current = true;
    setDate(next);
    setData(loadDay(next));
  };

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    localStorage.setItem(storageKey(date), JSON.stringify(data));
  }, [data, date]);

  const update = (patch: Partial<DayData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const updateMainTask = (i: number, patch: Partial<TaskItem>) =>
    update({
      mainTasks: data.mainTasks.map((t, idx) =>
        idx === i ? { ...t, ...patch } : t,
      ),
    });

  const updateOtherTask = (i: number, patch: Partial<TaskItem>) =>
    update({
      otherTasks: data.otherTasks.map((t, idx) =>
        idx === i ? { ...t, ...patch } : t,
      ),
    });

  const ritualsDone = useMemo(
    () => RITUALS.filter((r) => data.rituals[r.key]).length,
    [data.rituals],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Daily Focus
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-date">
              {formatDisplayDate(date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeDate(shiftDate(date, -1))}
              data-testid="button-prev-day"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => changeDate(today)}
              disabled={date === today}
              data-testid="button-today"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeDate(shiftDate(date, 1))}
              data-testid="button-next-day"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={onLock}
              title="Lock dashboard"
              data-testid="button-lock"
            >
              <Lock className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6 min-w-0">
          <Card className="p-6">
            <SectionHeader icon={ListTodo} title="Top 3 for today" />
            <div className="space-y-2">
              {data.mainTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <Checkbox
                    checked={task.done}
                    onCheckedChange={(v) => updateMainTask(i, { done: v === true })}
                    data-testid={`checkbox-main-task-${i}`}
                  />
                  <Input
                    value={task.text}
                    placeholder={`Main task ${i + 1}`}
                    onChange={(e) => updateMainTask(i, { text: e.target.value })}
                    className={task.done ? "line-through text-muted-foreground" : ""}
                    data-testid={`input-main-task-${i}`}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader icon={ListTodo} title="More tasks" />
            <div className="space-y-2">
              {data.otherTasks.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing here yet — add a task below.
                </p>
              )}
              {data.otherTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Checkbox
                    checked={task.done}
                    onCheckedChange={(v) => updateOtherTask(i, { done: v === true })}
                    data-testid={`checkbox-other-task-${i}`}
                  />
                  <Input
                    value={task.text}
                    placeholder="Task"
                    onChange={(e) => updateOtherTask(i, { text: e.target.value })}
                    className={task.done ? "line-through text-muted-foreground" : ""}
                    data-testid={`input-other-task-${i}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      update({
                        otherTasks: data.otherTasks.filter((_, idx) => idx !== i),
                      })
                    }
                    data-testid={`button-remove-task-${i}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-1"
                onClick={() =>
                  update({
                    otherTasks: [...data.otherTasks, { text: "", done: false }],
                  })
                }
                data-testid="button-add-task"
              >
                <Plus className="w-4 h-4 mr-1" /> Add task
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <SectionHeader icon={Trophy} title="Daily win" />
            <Input
              value={data.win}
              placeholder="What was your win today?"
              onChange={(e) => update({ win: e.target.value })}
              data-testid="input-daily-win"
            />
          </Card>

          <Card className="p-6">
            <SectionHeader icon={NotebookPen} title="Notes & journal" />
            <Textarea
              value={data.notes}
              rows={8}
              placeholder="Thoughts, reflections, anything worth writing down..."
              onChange={(e) => update({ notes: e.target.value })}
              data-testid="textarea-notes"
            />
          </Card>

          <Card className="p-6">
            <SectionHeader
              icon={Sunrise}
              title="Daily rituals"
              subtitle={`${ritualsDone}/${RITUALS.length}`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RITUALS.map(({ key, label, icon: Icon }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 cursor-pointer hover-elevate"
                  data-testid={`ritual-${key}`}
                >
                  <Checkbox
                    checked={data.rituals[key]}
                    onCheckedChange={(v) =>
                      update({ rituals: { ...data.rituals, [key]: v === true } })
                    }
                  />
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 self-start">
          <SectionHeader icon={Clock} title="Time log" subtitle="15 min blocks" />
          <div className="max-h-[70vh] overflow-y-auto pr-1 -mr-1">
            {TIME_SLOTS.map((slot) => (
              <div
                key={slot}
                className="flex items-center gap-2 border-b border-border/60 last:border-b-0"
              >
                <span className="text-[11px] tabular-nums text-muted-foreground w-16 shrink-0 text-right">
                  {slot}
                </span>
                <input
                  value={data.timeLog[slot] ?? ""}
                  onChange={(e) =>
                    update({ timeLog: { ...data.timeLog, [slot]: e.target.value } })
                  }
                  className="w-full bg-transparent text-sm text-foreground py-1.5 px-1 outline-none placeholder:text-muted-foreground/40 focus:bg-muted/50 rounded-sm"
                  placeholder=""
                  data-testid={`input-timelog-${slot.replace(/[\s:]/g, "-")}`}
                />
              </div>
            ))}
          </div>
        </Card>
      </main>

      <footer className="max-w-5xl mx-auto px-6 pb-8">
        <p className="text-xs text-muted-foreground">
          Entries are saved automatically in this browser (local storage on this
          device).
        </p>
      </footer>
    </div>
  );
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(
    () => readCookie(AUTH_COOKIE) === PASS_HASH,
  );

  if (!authed) {
    return <PasswordGate onUnlock={() => setAuthed(true)} />;
  }

  return (
    <Planner
      onLock={() => {
        clearAuthCookie();
        setAuthed(false);
      }}
    />
  );
}
