// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, workspace, commands, Disposable, Position, Range} from 'vscode';
import * as esformatter from 'esformatter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(disposables: Disposable[]) {
    // create a new formatter
    let formatter = new ESFormatController();

    // add to a list of disposables which are disposed when this extension
    // is deactivated again.
    disposables.push(formatter);
}

class ESFormatController {

    private _disposable: Disposable;

    constructor() {
        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.of(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        // Get the current text editor
        const editor = window.getActiveTextEditor();
        if (!editor) {
            return;
        }

        const doc = editor.getTextDocument();
        const docContent = doc.getText();

        const text = esformatter.format(docContent);

        editor.edit(editBuilder => {
            const lastLine = doc.getLineCount();

            const start = new Position(0, 0);
            const end = new Position(lastLine, doc.getTextOnLine(lastLine).length);

            editBuilder.replace(new Range(start, end), text);
        });
    }
}
