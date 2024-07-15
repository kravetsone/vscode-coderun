import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

export async function ensureFolder(dir: string) {
	if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}
