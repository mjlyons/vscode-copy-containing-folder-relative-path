import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyFolderRelativePath', () => {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor) {
            const currentFilePath = activeTextEditor.document.uri.fsPath;
            const currentFolderPath = path.dirname(currentFilePath);
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const workspaceFolderPath = workspaceFolders[0].uri.fsPath;
                const relativePath = path.relative(workspaceFolderPath, currentFolderPath);
                vscode.env.clipboard.writeText(relativePath).then(() => {
                    vscode.window.showInformationMessage('Relative path copied to clipboard!');
                }, (error) => {
                    vscode.window.showErrorMessage('Failed to copy relative path to clipboard: ' + error);
                });
            } else {
                vscode.window.showWarningMessage('No workspace folder found!');
            }
        } else {
            vscode.window.showWarningMessage('No active text editor!');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
