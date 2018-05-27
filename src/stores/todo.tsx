import { action, observable } from 'mobx';
import { TTodoItem } from 'containers/ToDo/types';

export class ToDoStore {
  @observable private items: TTodoItem[] = [];

  constructor() {
    const items = [
      'test1', 'test2', 'test3'
    ]

    items.forEach((item) => {
      this.addItem(this.createItem(item))
    })
  }

  private uniqueHash(): string {
    return ('' + Date.now()).split('').reduce((prev, current) => (
      prev + Math.random().toString(34).substring(1, parseInt(current))
    ), '').replace(/\W+/g, '')
  }

  private changeItem(foundItem: TTodoItem) {
    this.items = this.items.map(item => (foundItem.id === item.id ? foundItem : item))
  }

  public get itemsList() {
    return this.items;
  }

  @action('create todo item')
  public createItem(text: string): TTodoItem {
    return {
      id: this.uniqueHash(),
      text,
      completed: false,
      removed: false
    }
  }

  @action('add new todo element')
  public addItem(item) {
    this.items = [...this.items, item]
  }

  @action('find element by id')
  public findItemById(id) {
    return this.items.filter(item => item.id === id)[0]
  }

  @action('toggle removed todo item')
  public toggleRemoveItem(id) {
    const foundItem = this.findItemById(id)

    if (!foundItem) return

    foundItem.removed = !foundItem.removed

    this.changeItem(foundItem)
  }

  @action('toggle complete todo item')
  public toggleCompleteItem(id) {
    const foundItem = this.findItemById(id)

    if (!foundItem) return

    foundItem.completed = !foundItem.completed

    this.changeItem(foundItem)
  }
}

export default ToDoStore
