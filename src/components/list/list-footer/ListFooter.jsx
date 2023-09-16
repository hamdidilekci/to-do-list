import { useState } from "react";
import "./list-footer.css";
import { useListItems } from "../ListItemsContext";

function ListFooter() {
  const { listItems, setListItems } = useListItems();

  const [selected, setSelected] = useState({ id: "all" });

  const showAll = () => {
    setListItems((prevState) =>
      prevState.map((el) => {
        el.isVisible = true;
        return el;
      })
    );

    setSelected({ id: "all" });
  };

  const showActive = () => {
    setListItems((prevState) =>
      prevState.map((el) => {
        el.isCompleted ? (el.isVisible = false) : (el.isVisible = true);
        return el;
      })
    );

    setSelected({ id: "active" });
  };

  const showCompleted = () => {
    setListItems((prevState) =>
      prevState.map((el) => {
        el.isCompleted ? (el.isVisible = true) : (el.isVisible = false);
        return el;
      })
    );

    setSelected({ id: "completed" });
  };
  // set all items to completed, if all items completed set them to not completed
  const onClickAll = () => {
    const found = listItems.every((el) => el.isCompleted === true);
    if (found) {
      setListItems(
        listItems.map((el) => {
          el.isCompleted = false;
          return el;
        })
      );
    } else {
      setListItems(
        listItems.map((el) => {
          el.isCompleted = true;
          return el;
        })
      );
    }
  };

  const onDeleteAllCompleted = () => {
    setListItems((prevState) => prevState.filter((el) => !el.isCompleted));
  };

  return (
    <footer className="footer" hidden={listItems.length === 0}>
      <span className="todo-count">
        <strong> {listItems.length} </strong>
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            className={selected.id === "all" ? "selected" : ""}
            onClick={showAll}
            href="#/"
          >
            All
          </a>
        </li>
        <li>
          <a
            className={selected.id === "active" ? "selected" : ""}
            onClick={showActive}
            href="#/"
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={selected.id === "completed" ? "selected" : ""}
            onClick={showCompleted}
            href="#/"
          >
            Completed
          </a>
        </li>
        <li>
          <a onClick={onClickAll} href="#/">
            Mark all as complete
          </a>
        </li>
        <li>
          <a onClick={onDeleteAllCompleted} href="#/">
            Clear completed
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default ListFooter;
