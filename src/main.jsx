import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PokemonProvider from "./context/PokemonProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PokemonProvider>
    <App />
  </PokemonProvider>
);
