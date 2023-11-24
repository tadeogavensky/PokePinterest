import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/routes/home/Home.jsx";
import Pokedex from "./components/routes/pokedex/Pokedex.jsx";
import Page from "./components/routes/pokedex/pokemon/Page.jsx";
import Favorites from "./components/routes/favorites/Favorites.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/pokemon/:id" element={<Page />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
