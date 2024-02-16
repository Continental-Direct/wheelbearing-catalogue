import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";
import Nav from "./home/Nav";

import FilterContainer from "./home/filterContainer";
import CardContainer from "./cards/CardContainer";
// import SearchResultPage from "./SearchResultsPage";

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<FilterContainer />} />
        <Route path="/results" element={<CardContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
