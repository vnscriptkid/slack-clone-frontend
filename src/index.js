import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import SwitchRoutes from "./routes";
import reportWebVitals from "./reportWebVitals";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <SwitchRoutes />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
