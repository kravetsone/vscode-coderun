import vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	console.log(
		'Congratulations, your extension "vscode-coderun" is now active!',
	);

	const disposable = vscode.commands.registerCommand(
		"vscode-coderun.helloWorld",
		() => {
			vscode.window.showInformationMessage(
				"Hello World from CodeRun - тренажёр для разработчиков от Яндекса!",
			);
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
