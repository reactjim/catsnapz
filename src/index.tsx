import React from "react";
import ReactDOM from "react-dom";

// components
import { App } from "~components/app";
// contexts
import { AppProvider } from "~contexts/app";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
