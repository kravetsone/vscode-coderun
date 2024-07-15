import { writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path, { join } from "node:path";
import vscode from "vscode";
import type { _9ueceq } from "./types";
import { ensureFolder, runtimeSlugToExtension } from "./utils";
import { CodeRun } from "./wrapper";
// const jsonDocument = await vscode.workspace.openTextDocument({
// 	language: "json",
// 	content: JSON.stringify(data, null, 2),
// });
// await vscode.window.showTextDocument(
// 	jsonDocument,
// 	vscode.ViewColumn.Active,
// );

export async function activate(context: vscode.ExtensionContext) {
	const dir = path.join(homedir(), ".coderun");

	const disposable = vscode.commands.registerCommand(
		"vscode-coderun.helloWorld",
		async () => {
			const url = await vscode.window.showInputBox({
				title: "Введите ссылку на задачу",
			});
			if (!url) throw new Error("");
			const data = await CodeRun.fetchTaskByURL(url);

			const props = Object.values<_9ueceq>(data.props.pageProps.values).at(0);
			if (!props) throw new Error("");

			const taskFolder = join(dir, `${props.problemContextId}. ${props.slug}`);
			await ensureFolder(taskFolder);

			const runtime = await vscode.window.showQuickPick(
				props.compilers.map((x) => x.slug),
				{ title: "Выберите язык/рантайм/движок/компилятор" },
			);
			if (!runtime) throw new Error("");

			const solution = await CodeRun.fetchTaskSolutionTemplate(
				runtime,
				props.problemContextId,
			);
			const solutionFilePath = join(
				taskFolder,
				`solution.${runtimeSlugToExtension[runtime] || ""}`,
			);
			await writeFile(solutionFilePath, solution.result.content);
			await writeFile(
				join(taskFolder, "README.md"),
				// Может использовать dedent? хотя оверхед
				// biome-ignore lint/style/useTemplate: <explanation>
				`## ${props.order}. ${props.title} (${props.selectionBrief.title})\n\n` +
					`${props.statements.legend}\n\n` +
					`## Формат ввода:\n${props.statements.inputFormat}\n\n` +
					`## Формат вывода:\n${props.statements.outputFormat}\n\n` +
					props.statements.samples
						.map(
							(sample, index) =>
								`### Пример ${index + 1}\n \`\`\`\n# Ввод\n\n${sample.input.content}\`\`\`\n \`\`\`\n# Вывод\n\n${sample.output.content}\`\`\``,
						)
						.join("\n") +
					"\n" +
					`- Теги: ${props.tags.map((tag) => `\`${tag}\``).join(", ")}\n` +
					`- Сложность: ${props.difficulty}`,
			);

			// await vscode.commands.executeCommand(
			// 	"vscode.openFolder",
			// 	vscode.Uri.file(taskFolder),
			// );

			// await vscode.commands.executeCommand("workbench.action.closeSidebar");

			const solutionDocument = await vscode.workspace.openTextDocument(
				vscode.Uri.file(solutionFilePath),
			);
			await vscode.window.showTextDocument(
				solutionDocument,
				vscode.ViewColumn.Active,
			);

			await vscode.commands.executeCommand(
				"vscode.openWith",
				vscode.Uri.file(join(taskFolder, "README.md")),
				"vscode.markdown.preview.editor",
				vscode.ViewColumn.Beside,
			);
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
