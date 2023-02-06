import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ListTask } from "./Components/ListTask";

import { AddTask } from "./Components/AddTask";
import { useSelector, useDispatch } from "react-redux";
import { todosActions } from "./JS/Store/store";
import { Task } from "./Components/Task";

function App() {
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);


  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const myRef = useRef(null);

  useEffect(() => {

    let oldTodos  = [];
    oldTodos = JSON.parse(window.localStorage.getItem("oldTodo"));
   
    if (oldTodos) {

    if (oldTodos.length !== 0) {
      dispatch(todosActions.todosRepopulated([...todos, ...oldTodos]));
    }

  }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("oldTodo", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <div className="my-app">
        <ListTask />
        <AddTask
          input={input}
          setInput={setInput}
          myRef={myRef}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />

        <Task setInput={setInput} myRef={myRef} setEditTodo={setEditTodo} />
      </div>
    </div>
  );
}

export default App;
