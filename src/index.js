import React, { Component } from "react";
import { render } from "react-dom";
import HeaderComponent from "./Components/HeaderComponent.js";
import ListComponent from "./Components/ListComponent.js";
import InputComponent from "./Components/InputComponent.js";
import FooterComponent from "./Components/FooterComponent.js";

import "./index.css";
import "./app.css";

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { title: "TODO1", done: false },
        { title: "TODO2", done: false },
        { title: "TODO3", done: false },
        { title: "TODO4", done: false }
      ],
      currentInput: ""
    };
    // We bind it so that when we pass it down the stack and
    // the function gets called, it refers to the context of
    // this class and not the class further down from where it gets called.
    // or updateTodos={()=> this.updateTodos}
    // DO THIS IN THE CONSTRUCTOR so that any other times it is passed
    // down, we do not have to call the bind method each time
    this.updateTodos = this.updateTodos.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.addTodo2 = this.addTodo2.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  updateTodos(indexOfTodo, done) {
    // when we change the state we have to replace the whole thing
    this.state.todoList[indexOfTodo] = {
      title: this.state.todoList[indexOfTodo].title,
      done
    }; // es6 shortcut instead of done: done

    // trigger re-rendering using a spread array to create
    // a new reference address in memory so react knows a
    // change has occurred. React only knows that a state has
    // changed when there is a change in the reference
    this.setState({ todoList: [...this.state.todoList] });
  }

  removeTodo(indexOfTodo) {
    const newList = this.state.todoList.filter((item, i) => {
      return i !== indexOfTodo;
    });
    this.setState({ todoList: newList });
  }

  addTodo() {
    this.state.todoList.push({ title: this.state.currentInput, done: false });
    this.setState({ currentInput: "", todoList: [...this.state.todoList] });
  }

  addTodoRefs(event) {
    event.preventDefault();
    const id = this.state.lastId + 1;
    if (this.todoInput.value) {
      let newTodos = this.state.todos.concat({
        id,
        title: this.todoInput,
        done: false
      });
      this.setState({
        todos: newTodos,
        lastId: id
      });
      this.todoInput.value = "";
    }
  }

  addTodo2(todoText) {
    this.state.todoList.push({ title: todoText, done: false });
    this.setState({ todoList: this.state.todoList });
  }

  newTodo(event) {
    this.setState({ currentInput: event.target.value });
    //this.setState({currentInput: that.refs.todo.value});
  }

  clearAll() {
    const newList = this.state.todoList.filter((item, i) => {
      // filter to clear all unchecked boxes
      return item.done === false;
    });
    this.setState({ todoList: newList });
  }

  getNumCompleted() {
    const newList = this.state.todoList.filter((item, i) => {
      return item.done;
    });
    return newList.length ? true : false;
  }

  render() {
    return (
      <div className="todo-list">
        <div className="todo-list">
          <HeaderComponent title="So Much To Do" />
        </div>
        <div className="add-todo">
          <InputComponent
            addTodo2={this.addTodo2}
            newTodo={this.newTodo}
            currentInput={this.state.currentInput}
          />
        </div>
        <div className="todo-list">
          <ListComponent
            updateTodos={this.updateTodos}
            removeTodo={this.removeTodo}
            todoList={this.state.todoList}
          />
        </div>
        <div>
          <FooterComponent
            numsToDo={this.state.todoList.length}
            hasCompleted={this.getNumCompleted()}
            clearAll={this.clearAll}
          />
        </div>
      </div>
    );
  }
}

render(<AppComponent />, document.getElementById("root"));
