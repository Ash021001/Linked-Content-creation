export interface HistoryItem {
  id: string;
  post: string;
  persona: string;
  niche: string;
  tone: string;
  length: string;
  platform?: string;
  createdAt: number;
}

const KEY = "viraly-history";
const MAX_ITEMS = 50;

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(item: Omit<HistoryItem, "id" | "createdAt">): HistoryItem {
  const entry: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const updated = [entry, ...getHistory()].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return entry;
}

export function deleteFromHistory(id: string): void {
  const updated = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
