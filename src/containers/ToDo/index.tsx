import * as React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import * as STORE from './../../constants/store';

@inject(STORE.TODO_STORE)
@observer
export class TodoApp extends React.Component {
  static propTypes = {
    onNewItem: PropTypes.func
  };

  static defaultProps = {
    onNewItem: () => {}
  };

  state = {
    items: []
  };

  constructor(props) {
    super(props);

    if (props.items) {
      this.setState({
        items: props.items
      })
    }
  }

  componentDidMount() {

  }

  toggleRemoveItem(id) {
    const todoStore = this.props[STORE.TODO_STORE];

    todoStore.toggleRemoveItem(id);
  };

  addItem(text) {
    if (text.length < 5) {
      console.error('Min lenght 5');

      return;
    }

    const todoStore = this.props[STORE.TODO_STORE];

    const newItem = todoStore.createItem(text);

    todoStore.addItem(newItem);
  }

  render() {
    const todoStore = this.props[STORE.TODO_STORE];
    const items = todoStore.itemsList;

    console.log(items);

    return <div className='todo-items'>
      <TodoForm onAddItem={ text => { this.addItem(text) } }></TodoForm>
      <TodoList items={items} onChangeRemove={ id => { this.toggleRemoveItem(id) } }></TodoList>
    </div>;
  }
}

const TodoForm = ({ onAddItem = (text) => {} }) => {
  let _text = '';

  const submit = (event) => {
    event.preventDefault();

    onAddItem(_text.value);

    _text.value = '';

    _text.focus();
  };

  return <form className="todo-items__form" onSubmit={submit}>
    <input ref={ input => _text = input } className="todo-items__input" type="text" placeholder="Input text" required/>
    <span className="todo-items__submit btn" onClick={submit}>Send</span>
  </form>
};

const TodoList = ({ items, onChangeRemove = (id: number) => {} }) => {
  return <div className="todo-items__list">
    {items.map(item =>
      <TodoItem key={item.id} item={item} onChangeRemove={ () => onChangeRemove(item.id) }></TodoItem>)}
  </div>;
};

const TodoItem = ({ item: { text, remove, completed }, onChangeRemove = () => {} }) => {
  return <div className={ 'todo-items__item' + (remove ? ' todo-items__item--deleted' : '') }>
    <div className="todo-items__col">
      {text}
    </div>
    <div className="todo-items__col">
      <div className="btn" onClick={onChangeRemove}>{ !remove ? 'delete' : 'back' }</div>
    </div>
  </div>;
};
