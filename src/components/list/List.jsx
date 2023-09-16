import ListHeader from "./list-header/ListHeader.jsx";
import ListItem from "./list-item/ListItem.jsx";
import ListFooter from "./list-footer/ListFooter.jsx";
import "./list.css";

function List() {
  return (
    <div className="todoapp">
      <header>
        <ListHeader />
      </header>
      <section>
        <ListItem />
      </section>
      <footer>
        <ListFooter />
      </footer>
    </div>
  );
}

export default List;
