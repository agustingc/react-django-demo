import React from "react";
import ReactDOM from "react-dom";

/* After install, import the minified CSS file in your app's entry file */
import "semantic-ui-css/semantic.min.css";

/** Redux ToolKit */
import store from "./app/store";
import { Provider } from "react-redux";

import App from "./App";

/* render */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
