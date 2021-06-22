import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import AddMovies from "./pages/AddMovies";
import EditMovies from "./pages/EditMovies";
import Favourite from "./pages/Favourite";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/addMovies">
            <AddMovies></AddMovies>
          </Route>
          <Route exact path="/editMovies/:id">
            <EditMovies></EditMovies>
          </Route>
          <Route exact path="/favourite">
            <Favourite></Favourite>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
