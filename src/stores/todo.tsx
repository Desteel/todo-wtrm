import {action, computed, observable} from 'mobx';

export class ToDoStore {
  @observable type = false;
  @observable items = [];

  @computed get typeState() {
    return this.type;
  }

  @computed get typeString() {
    return '' + this.type;
  }

  get itemsList() {
    return this.items;
  }

  @action('toggle type')
  toggleType() {
    this.type = !this.type;
  }

  uniqueHash() {
    return ('' + Date.now()).split('').reduce((prev, current) => {
      return prev + Math.random().toString(34).substring(1, parseInt(current));
    }, '').replace(/\W+/g, '');
  }

  @action('create todo item')
  createItem(text) {
    return {
      id: this.uniqueHash(),
      text,
      completed: false,
      remove:false
    }
  }

  @action('add new todo element')
  addItem(item) {
    this.items = [...this.items, item]
  }

  getItemById(id) {
    return this.items.filter(item => item.id === id);
  }

  @action('toggle remove todo item')
  toggleRemoveItem(id) {
    let foundItem = this.getItemById(id);

    if (!foundItem.length) {
      return;
    }

    foundItem = foundItem[0];

    foundItem.remove = !foundItem.remove;

    this.items = this.items.map(item => (foundItem.id === item.id ? foundItem : item));
  }
}

export default ToDoStore
