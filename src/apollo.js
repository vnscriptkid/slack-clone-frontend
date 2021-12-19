import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
  split,
} from "@apollo/client";
import "semantic-ui-css/semantic.min.css";
import { get } from "lodash";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
    },
  },
});

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
  if (!forward(operation).map) return forward(operation);

  return forward(operation).map((response) => {
    const context = operation.getContext();

    if (get(response, "errors[0].message") === "Not authenticated") {
      window.history.pushState(null, "", "/login");
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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, populateTokens, splitLink]),
  connectToDevTools: true,
});

export default client;
