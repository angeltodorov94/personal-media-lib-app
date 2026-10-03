/**
 * Collapses entries that share the same person id into one, joining the
 * value of `field` (a job or character) with " / ". Order of first appearance is kept.
 */
export function mergeDuplicatePeople<
  T extends { id: number },
  K extends keyof T & string,
>(items: T[], field: K): T[] {
  const merged = new Map<number, T>();

  for (const item of items) {
    const existing = merged.get(item.id);

    if (!existing) {
      merged.set(item.id, item);
      continue;
    }

    const current = String(existing[field]);
    const next = String(item[field]);

    if (!current.split(" / ").includes(next)) {
      merged.set(item.id, { ...existing, [field]: `${current} / ${next}` });
    }
  }

  return [...merged.values()];
}
