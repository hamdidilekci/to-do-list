import { useState, useRef } from "react";
import "./list-header.css";

import { useListItems } from "../ListItemsContext";

function ListHeader() {
  const { listItems, setListItems } = useListItems();

  // Autofocus to input when page first render
  const ref = useRef(null);

  const initialInputValue = "";
  const [input, setInput] = useState(initialInputValue);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input === "") return false;

    const value = {
      name: input,
      isCompleted: false,
      isVisible: true,
      isEditing: false,
    };

    setListItems([...listItems, value]);
    setInput(initialInputValue);
  };

  return (
    <header>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={onChangeInput}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          ref={ref}
        />
      </form>
    </header>
  );
}

export default ListHeader;
