import {action, computed, observable} from 'mobx';

export class ToDoStore {
  @observable type = false;

  @computed get typeState() {
    return this.type;
  }

  @computed get typeString() {
    return '' + this.type;
  }

  @action('toggle type')
  toggleType() {
    this.type = !this.type;
  }
}

export default ToDoStore
