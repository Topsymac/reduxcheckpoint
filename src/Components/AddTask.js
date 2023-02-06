// import React from 'react'

// const AddTask = () => {
//   return (
//     <div>
//         <form action="">
//             <input type="text" placeholder='Enter a Task'/>
//             <button>Add</button>
//         </form>
//     </div>
//   )
// }

// export default AddTask
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "../JS/Store/store";

export const AddTask = ({
  input,
  setInput,

  editTodo,
  setEditTodo,
  myRef,
}) => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const updateTodo = (title, id) => {
    //   const newTodos = todos.map((todo) =>
    //     // if(todos.id === id) {
    //     //   console.log({input, id})
    //     //   return todos.title = input;

    //     // }else{
    //     //   return todo
    //     // }
    //     todo.id === id ? { id, title } : todo
    // );
    //   setTodos(newTodos);

    if (input.trim() !== "") {
      dispatch(
        todosActions.todoEdited([...todos, { id: uuidv4(), title: input, isDone: false }])
      );
      setEditTodo("");
    }
    // setEditTodo("");
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!editTodo) {
      if (input.trim() !== "") {
        dispatch(
          todosActions.todoAdded([...todos, { id: uuidv4(), title: input, isDone: false }])
        );
      }
      setInput("");
    } else {
      updateTodo(input, editTodo.id);
      setInput("");
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          ref={myRef}
          placeholder="Enter a ToDo task"
          className="py-2 px-3 w-50 my-4"
          value={input}
          required
          onChange={onInputChange}
        />
        <button className="btn mx-3 btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};