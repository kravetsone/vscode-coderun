import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

export async function ensureFolder(dir: string) {
	if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

export const runtimeSlugToExtension: Record<string, string | undefined> = {
	c: "c",
	csharp: "cs",
	cpp: "cpp",
	dart: "dart",
	go: "go",
	java: "java",
	nodejs_20: "js",
	kotlin: "kt",
	pascal: "pas",
	php: "php",
	pypy: "py",
	python: "py",
	rust: "rs",
	swift: "swift",
};
