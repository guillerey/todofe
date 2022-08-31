import React, { useState, useRef } from "react";
import { BsArrowDown } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      description,
      isDone: false,
      showDescription: false,
    });
    setInput("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
          <input
            placeholder="Update your task"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit todo-description"
          />
          <textarea
            placeholder="update your description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="todo-input todo-description"
          />

          <button onClick={handleSubmit} className="todo-button update">
            <RiCheckboxCircleLine />
          </button>
        </div>
      ) : (
        <>
          <input
            placeholder="add a new task"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleDescription} className="todo-button edit">
          <BsArrowDown />
          </button>
          {showDescription && (
            <textarea
              placeholder="add a description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              className="todo-input todo-description"
            />
          )}
          <button onClick={handleSubmit} className="todo-button">
          <p>Create</p>
          </button>
          
        </>
      )}
    </form>
  );
}

export default TodoForm;
