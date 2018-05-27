import { action, observable } from 'mobx';
import { TTodoItem } from 'containers/ToDo/types';
import axios, { AxiosResponse } from 'axios';

export class ToDoStore {
  @observable private items: TTodoItem[] = [];

  constructor() {
    axios.get('/todo')
      .then(action((response: AxiosResponse<TTodoItem[]>) => {
        this.items = response.data.filter(item => {
          if (item.removed) {
            this.deleteItemResult(item)
          }

          return !item.removed
        })
      }))
      .catch((error) => {
        console.error('Request error', error)
      })
  }

  private sendItemResult(item) {
    return axios.post('/todo', item)
  }

  private updateItemResult(item) {
    return axios.put(`/todo/${item.id}`, item)
  }

  private deleteItemResult(item) {
    return axios.delete(`/todo/${item.id}`)
  }

  private uniqueHash(): string {
    return ('' + Date.now()).split('').reduce((prev, current) => (
      prev + Math.random().toString(34).substring(1, parseInt(current))
    ), '').replace(/\W+/g, '')
  }

  @action('change item')
  private async changeItem(foundItem: TTodoItem) {
    await this.updateItemResult(foundItem).then(action(() => {
      this.items = this.items.map(item => (foundItem.id === item.id ? foundItem : item))
    }))
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
    this.sendItemResult(item).then(action(() => {
      this.items = [...this.items, item]
    }))
  }

  @action('find element by id')
  public findItemById(id) {
    return this.items.filter(item => item.id === id)[0]
  }

  @action('toggle remove todo item')
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
