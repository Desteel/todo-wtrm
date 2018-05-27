import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as STORE from './../../constants/store';
import { ToDoStore } from 'stores/todo';
import { TodoList, TodoItem, TodoItemCol, Todo, TodoButton } from './styles';
import { TodoForm } from './form';

@inject(STORE.TODO_STORE)
@observer
export class TodoApp extends React.Component {
  private todoStore: ToDoStore = this.props[STORE.TODO_STORE]

  public toggleRemoveItem = (id: string) => {
    this.todoStore.toggleRemoveItem(id);
  };

  public toggleCompleteItem = (id: string) => {
    this.todoStore.toggleCompleteItem(id);
  };

  public addItem = (text: string) => {
    if (text.length < 5) {
      console.error('Min lenght 5');

      return;
    }

    const newItem = this.todoStore.createItem(text);

    this.todoStore.addItem(newItem);
  }

  // public componentWillUpdate(newProps, newState) {
  //   console.log(newProps, newState)
  // }

  public render() {
    const items = this.todoStore.itemsList

    return (
      <Todo>
        <TodoForm onAddItem={this.addItem}></TodoForm>
        <TodoList>
          {items.map(({ id, text, removed, completed }) => (
            <TodoItem key={id} isRemoved={removed} isCompleted={completed}>
              <TodoItemCol>
                {text}
              </TodoItemCol>
              <TodoItemCol>
                <TodoButton onClick={() => this.toggleRemoveItem(id)}>{!removed ? 'delete' : 'back'}</TodoButton>
                <TodoButton onClick={() => this.toggleCompleteItem(id)}>{!completed ? 'complete' : 'uncomplete'}</TodoButton>
              </TodoItemCol>
            </TodoItem>
          ))}
        </TodoList>
      </Todo>
    )
  }
}