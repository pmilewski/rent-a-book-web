import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraBaseProvider, CSSReset } from '@chakra-ui/react'
import { theme } from '@chakra-ui/theme'
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App";

const GRAPHQL_ENDPOINT = "https://examples.devmastery.pl/library-ids/graphql";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
  possibleTypes: {
    Anything: ["Book", "Author", "User"]
  }
});
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ApolloProvider client={client}>
        <Router>
            <ChakraBaseProvider theme={theme}>
                <CSSReset />
                <App />
            </ChakraBaseProvider>
        </Router>
    </ApolloProvider>
);
