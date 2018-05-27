import * as React from "react";
import { TTodoForm } from "./types";


export class TodoForm extends React.Component<TTodoForm> {
    private inputText: HTMLInputElement

    public submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
        const { onAddItem } = this.props

        event.preventDefault();

        onAddItem(this.inputText.value);

        this.inputText.value = '';

        this.inputText.focus();
    }

    public render() {
        return (
            <form className="todo-items__form" onSubmit={this.submitHandle}>
                <input ref={input => this.inputText = input} className="todo-items__input" type="text" placeholder="Input text" required />
                <button type="submit" className="todo-items__submit btn">Send</button>
            </form>
        )
    }
}