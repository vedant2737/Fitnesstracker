import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Nutrition from "./pages/Nutrition";
import Strength from "./pages/Strength";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import Cardio from "./pages/Cardio";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/cardio" element={<Cardio />} />
            <Route path="/strength" element={<Strength />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/nutrition" element={<Nutrition />} /> */}
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
