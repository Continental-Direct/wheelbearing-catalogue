import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";
import Nav from "./Nav";

import FilterContainer from "./filterContainer";
import CardContainer from "./CardContainer";
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
