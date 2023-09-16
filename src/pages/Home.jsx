import React from "react";
import AppFooter from "../modules/views/AppFooter.jsx";
import List from "../components/list/List.jsx";
import MyAppBar from "../modules/views/MyAppBar.jsx";
import withRoot from "../modules/withRoot.jsx";

function Index() {
  return (
    <>
      <MyAppBar />
      <List />
      <AppFooter />
    </>
  );
}

export default withRoot(Index);
