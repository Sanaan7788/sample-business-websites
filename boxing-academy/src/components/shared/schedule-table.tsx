"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type ScheduleSession = {
  id: string;
  day: string; // MON..SUN
  start: string; // "07:30"
  end: string; // "08:30"
  program: { name: string; slug: string; level: string };
  coach: string | null;
};

const DAY_ORDER = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const DAY_LABEL: Record<string, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
  SUN: "Sunday",
};

/**
 * Filterable class schedule (FR-13). Desktop: grouped tables per day.
 * Mobile: stacked list. Filters by day + program. `preview` truncates for home.
 */
export function ScheduleTable({
  sessions,
  preview = false,
}: {
  sessions: ScheduleSession[];
  preview?: boolean;
}) {
  const [day, setDay] = useState<string>("ALL");
  const [program, setProgram] = useState<string>("ALL");

  const programs = useMemo(
    () =>
      Array.from(new Map(sessions.map((s) => [s.program.slug, s.program.name])).entries()).map(
        ([slug, name]) => ({ slug, name }),
      ),
    [sessions],
  );

  const filtered = useMemo(() => {
    const list = sessions
      .filter((s) => (day === "ALL" ? true : s.day === day))
      .filter((s) => (program === "ALL" ? true : s.program.slug === program))
      .sort(
        (a, b) =>
          DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.start.localeCompare(b.start),
      );
    return preview ? list.slice(0, 6) : list;
  }, [sessions, day, program, preview]);

  const byDay = useMemo(() => {
    const map = new Map<string, ScheduleSession[]>();
    for (const s of filtered) {
      if (!map.has(s.day)) map.set(s.day, []);
      map.get(s.day)!.push(s);
    }
    return Array.from(map.entries()).sort(
      ([a], [b]) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
    );
  }, [filtered]);

  return (
    <div>
      {!preview && (
        <div className="mb-8 flex flex-wrap gap-4">
          <Filter
            label="Day"
            value={day}
            onChange={setDay}
            options={[
              { value: "ALL", label: "All days" },
              ...DAY_ORDER.map((d) => ({ value: d, label: DAY_LABEL[d] })),
            ]}
          />
          <Filter
            label="Program"
            value={program}
            onChange={setProgram}
            options={[
              { value: "ALL", label: "All programs" },
              ...programs.map((p) => ({ value: p.slug, label: p.name })),
            ]}
          />
        </div>
      )}

      {byDay.length === 0 ? (
        <p className="text-muted">No classes match your filters.</p>
      ) : (
        <div className="space-y-8">
          {byDay.map(([d, items]) => (
            <div key={d}>
              <h3 className="font-display text-accent-text mb-3 text-lg font-bold uppercase">
                {DAY_LABEL[d]}
              </h3>
              <ul className="divide-border border-border divide-y overflow-hidden rounded-lg border">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className="bg-surface flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-display text-base font-semibold">
                      {s.start} – {s.end}
                    </span>
                    <span className="flex-1 sm:px-6">{s.program.name}</span>
                    {s.coach && <span className="text-muted text-sm">{s.coach}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="text-muted mb-1 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border-border bg-surface text-fg rounded-md border px-4 py-2.5",
          "focus:border-accent focus:outline-none",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
