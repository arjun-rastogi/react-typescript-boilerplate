import React from "react";
import RootNavigation from "./navigation/";
import { BrowserRouter } from "react-router-dom";
type Props = {};

function App({}: Props) {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RootNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
