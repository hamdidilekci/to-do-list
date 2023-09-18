import ListHeader from "./list-header/ListHeader.jsx";
import ListTable from "./list-item/ListTable.jsx";

import { Container, Stack, Box } from "@mui/material";

function List() {
  return (
    <Container>
      <ListHeader />
      <ListTable />
    </Container>
  );
}

export default List;
