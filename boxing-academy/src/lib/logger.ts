/**
 * Minimal structured logger — JSON lines, easy to grep/ship.
 * Used on API routes + services (docs/REQUIREMENTS.md NFR-8).
 */
type Level = "info" | "warn" | "error";

function log(level: Level, event: string, data?: Record<string, unknown>) {
  const entry = { level, event, time: new Date().toISOString(), ...data };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => log("info", event, data),
  warn: (event: string, data?: Record<string, unknown>) => log("warn", event, data),
  error: (event: string, data?: Record<string, unknown>) => log("error", event, data),
};
