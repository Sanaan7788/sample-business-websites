import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Idempotent seed (upserts) — safe to re-run. See docs/DEPLOYMENT_GUIDE.md §4.
 *
 * Confirmed content (docs/BUSINESS_PROFILE.md): Group Classes + Personal Training,
 * Mon–Fri 7:30 AM & 6:00 PM. Everything marked `// PLACEHOLDER` is roadmap content
 * that is NOT yet confirmed for Cactus Boxing Gym — replace once the owner confirms.
 */

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

// ── Programs ────────────────────────────────────────────
const programs = [
  {
    slug: "group-boxing",
    name: "Group Boxing Classes",
    description:
      "Coached group sessions for all levels — technique, conditioning, and real boxing. All you need is shoes to work out in.",
    level: "ALL" as const,
    ageGroup: "ADULT" as const,
    order: 1,
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    description:
      "One-on-one coaching tailored to your goals, pace, and skill level. Build fundamentals fast with focused attention.",
    level: "ALL" as const,
    ageGroup: "ALL" as const,
    order: 2,
  },
  // PLACEHOLDER programs — confirm these are actually offered before launch.
  {
    slug: "beginner-fundamentals",
    name: "Beginner Fundamentals",
    description:
      "Brand new to boxing? Learn stance, footwork, and the basic punches in a no-pressure, ego-free setting.",
    level: "BEGINNER" as const,
    ageGroup: "ADULT" as const,
    order: 3,
  },
  {
    slug: "youth-boxing",
    name: "Youth Boxing", // PLACEHOLDER
    description:
      "Discipline, confidence, and fitness for kids and teens through structured, safe boxing instruction.",
    level: "ALL" as const,
    ageGroup: "YOUTH" as const,
    order: 4,
  },
  {
    slug: "womens-boxing",
    name: "Women's Boxing", // PLACEHOLDER
    description:
      "A welcoming, empowering class focused on technique, strength, and conditioning for women.",
    level: "ALL" as const,
    ageGroup: "ADULT" as const,
    isWomensOnly: true,
    order: 5,
  },
];

// ── Coaches (PLACEHOLDER — no public coach data found) ──
const coaches = [
  {
    slug: "head-coach",
    name: "Head Coach", // PLACEHOLDER
    bio: "Lead coach at Cactus Boxing Gym. Bio to be provided by the gym.",
    record: null,
    certifications: [] as string[],
    headshotUrl: null,
    order: 1,
  },
];

// ── Pricing (PLACEHOLDER — no public pricing found) ─────
const pricingTiers = [
  {
    name: "Drop-In", // PLACEHOLDER
    price: 20,
    interval: "DROP_IN" as const,
    features: ["Single group class", "No commitment"],
    order: 1,
  },
  {
    name: "Unlimited Monthly", // PLACEHOLDER
    price: 120,
    interval: "MONTH" as const,
    features: ["Unlimited group classes", "Mon–Fri AM & PM sessions"],
    isHighlighted: true,
    cancellationNote: "Cancel anytime.",
    order: 2,
  },
  {
    name: "Personal Training", // PLACEHOLDER
    price: 60,
    interval: "MONTH" as const,
    features: ["1-on-1 coaching", "Tailored programming"],
    order: 3,
  },
];

// ── Weekly schedule: confirmed Mon–Fri 7:30 AM & 6:00 PM ─
const weekdays = ["MON", "TUE", "WED", "THU", "FRI"] as const;
const classTimes = [
  { start: "07:30", end: "08:30" },
  { start: "18:00", end: "19:00" },
];

async function main() {
  // Programs
  for (const p of programs) {
    await db.program.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  // Coaches
  for (const c of coaches) {
    await db.coach.upsert({ where: { slug: c.slug }, update: c, create: c });
  }

  // Pricing — no natural unique key; reset then insert for a clean idempotent seed.
  await db.pricingTier.deleteMany();
  for (const t of pricingTiers) {
    await db.pricingTier.create({ data: t });
  }

  // Schedule — tie group classes to the head coach; reset then insert.
  const groupBoxing = await db.program.findUniqueOrThrow({ where: { slug: "group-boxing" } });
  const headCoach = await db.coach.findUniqueOrThrow({ where: { slug: "head-coach" } });
  await db.classSession.deleteMany();
  for (const day of weekdays) {
    for (const t of classTimes) {
      await db.classSession.create({
        data: {
          programId: groupBoxing.id,
          coachId: headCoach.id,
          dayOfWeek: day,
          startTime: t.start,
          endTime: t.end,
          capacity: 20, // PLACEHOLDER
        },
      });
    }
  }

  console.log("✓ Seed complete:", {
    programs: programs.length,
    coaches: coaches.length,
    pricingTiers: pricingTiers.length,
    sessions: weekdays.length * classTimes.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
