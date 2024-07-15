import type { __NEXT_DATA__ } from "./types";

const NEXT_DATA_REGEXP =
	/<script id="__NEXT_DATA__" type="application\/json" nonce="(.*)">(.*)<\/script>/i;

function parseNextData(text: string) {
	return JSON.parse(
		text.match(NEXT_DATA_REGEXP)?.at(2) || "{}",
	) as __NEXT_DATA__;
}

// TODO: improve fetch helper
async function request<T>(url: string, type: "text" | "json" = "json") {
	const response = await fetch(url, {
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,fil;q=0.6",
			"cache-control": "max-age=0",
			"sec-ch-ua":
				'"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
		},
	});
	console.log(response);
	return response[type]() as T;
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CodeRun {
	static async fetchTaskByURL(url: string) {
		const data = await request<string>(url, "text");

		const next_data = parseNextData(data);
		console.log(next_data);

		return next_data;
	}
	static async fetchTaskSolutionTemplate(compilerSlug: string, taskId: number) {
		const data = await request<{ error: null; result: { content: string } }>(
			`https://coderun.yandex.ru/api/problem/triangle/solution-template?compilerSlug=${compilerSlug}&problemContextId=${taskId}`,
		);
		console.log(data);
		return data;
	}
}
