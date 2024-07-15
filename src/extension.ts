import { writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path, { join } from "node:path";
import vscode from "vscode";
import type { _9ueceq } from "./types";
import { ensureFolder } from "./utils";
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

			const solution = await CodeRun.fetchTaskSolutionTemplate(
				"nodejs_20",
				props.problemContextId,
			);
			await writeFile(join(taskFolder, "solution.js"), solution.result.content);
			await writeFile(join(taskFolder, "README.md"), props.statements.legend);

			await vscode.commands.executeCommand(
				"vscode.openFolder",
				vscode.Uri.file(taskFolder),
			);

			await vscode.commands.executeCommand("workbench.action.closeSidebar");

			const solutionDocument = await vscode.workspace.openTextDocument(
				vscode.Uri.file(join(taskFolder, "solution.js")),
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
