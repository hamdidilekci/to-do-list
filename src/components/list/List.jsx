import ListHeader from "./list-header/ListHeader.jsx";
import ListTable from "./list-item/ListTable.jsx";

import { Container } from "@mui/material";

function List() {
  return (
    <Container>
      <ListHeader />
      <ListTable />
    </Container>
  );
}

export default List;
