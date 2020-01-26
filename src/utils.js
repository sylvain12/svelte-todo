// Local storage

export class LS {
  constructor(key, items) {
    this.key = key;
    this.items = items;
  }
  checkIfInLS() {
    return localStorage.getItem(this.key) ? true : false;
  }

  getFromLS() {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return [];
  }

  saveToLS(todo) {
    let content = [];
    if (this.checkIfInLS()) {
      content = this.getFromLS(this.key);
      console.log(content);
    }
    content.push(todo);
    localStorage.setItem(this.key, JSON.stringify(content));
  }

  removeFromLS(todo) {
    if (this.checkIfInLS()) {
      let todos = this.getFromLS(this.key);
      todos = todos.filter(t => t.id !== todo.id);
      localStorage.setItem(this.key, JSON.stringify(todos));
    }
  }

  removeCompletedTodoFromLS() {
    if (this.checkIfInLS()) {
      let todos = this.getFromLS(this.key);
      todos = todos.filter(t => !t.completed);
      localStorage.setItem(this.key, JSON.stringify(todos));
    }
  }

  editStateFromLs(todo) {
    if (this.checkIfInLS()) {
      let todos = this.getFromLS(this.key);
      todos = todos.map(t => {
        if (t.id === todo.id) {
          t.completed = !t.completed;
        }
        return t;
      });
      localStorage.setItem(this.key, JSON.stringify(todos));
    }
  }
}
