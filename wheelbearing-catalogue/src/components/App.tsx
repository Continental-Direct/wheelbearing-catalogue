import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";
import Nav from "./Nav";
import Footer from "./Footer";
import FilterContainer from "./filterContainer";
// import SearchResultPage from "./SearchResultsPage";

function App() {
  return (
    <Router>
      <Nav />
      <div className="background-container">
        <div className="dark-overlay">
          <Routes>
            <Route path="/" element={<FilterContainer />} />
            {/* <Route path="/results" element={<SearchResultPage />} /> */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
