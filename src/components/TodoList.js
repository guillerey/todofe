import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios";
import {getTodos, updateTodoData } from "../lib/api";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
    .then((todos) => setTodos(todos))
    .catch((error) => alert(error.message));
    }, []);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    };

  axios.post("https://todo-project-be-corecode.onrender.com/v1/to-dos", { ...todo }).then (() => {
    getTodos()
    .then((todos) => setTodos(todos))
    .catch((error) => alert(error.message));
   });
};

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, { title, description }) => {
    if (!title || /^\s*$/.test(title)) {
      return;
    }

    updateTodoData(todoId, { title, description }) 
      .then(() => {
        getTodos()
          .then((todos) => setTodos(todos))
          .catch((error) => alert(error.message));
      });
    
    };

  const removeTodo = (id) => {
    axios.delete(`https://todo-project-be-corecode.onrender.com/v1/to-dos/${id}`).then (() => {
      getTodos()
        .then((todos) => setTodos(todos))
        .catch((error) => alert(error.message));
    });
  };

  const completeTodo = (id, is_done) => {
    updateTodoData(id, { isDone: is_done === 1 ? 0 : 1 })
      .then(() => {
        getTodos()
          .then((todos) => setTodos(todos))
          .catch((error) => alert(error.message));
      });
  };

  return (
    <>
      <h1>What To Do?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
