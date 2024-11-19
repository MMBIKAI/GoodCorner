import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";
import "./index.css";

// Initialize the Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

// Render the app, wrapped with ApolloProvider and BrowserRouter
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>  {/* Wrap your app with ApolloProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);