import { Volume } from "../types/Volume";
import { get, set } from "idb-keyval";

const READ_KEY = "read-collection";

export async function saveReadToCache(read: Volume[]): Promise<void> {
  await set(READ_KEY, read);
}

export async function getCachedRead(): Promise<Volume[]> {
  const data = await get(READ_KEY);
  return data || [];
}
