import ListHeader from "./ListHeader.jsx";
import ListTable from "./ListTable.jsx";

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
