import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import "semantic-ui-css/semantic.min.css";

import reportWebVitals from "./reportWebVitals";
import SwitchRoutes from "./routes";
import { get } from "lodash";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token"),
      "x-refresh-token": localStorage.getItem("refreshToken"),
    },
  }));

  return forward(operation);
});

const populateTokens = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();

    if (get(response, "errors[0].message") === "Not authenticated") {
      window.history.pushState(null, "", "login");
      window.location.reload();
    } else {
      const token = context.response.headers.get("x-token");
      const refreshToken = context.response.headers.get("x-refresh-token");

      if (token) localStorage.setItem("token", token);
      if (refreshToken) localStorage.setItem("token", refreshToken);
    }

    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, populateTokens, httpLink]),
});

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
