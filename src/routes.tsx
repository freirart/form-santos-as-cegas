import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Form from "./pages/Form";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Form} />
    </BrowserRouter>
  );
}

export default Routes;
