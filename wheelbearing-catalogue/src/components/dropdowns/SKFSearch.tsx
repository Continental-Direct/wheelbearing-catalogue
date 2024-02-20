import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../assets/supaBaseClient";
// import "../../CSS/skf.css";

const SKFSearch = () => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Query for SKF number
      const { data: skfData, error: skfError } = await supabase
        .from("wheelbearing")
        .select("*")
        .eq("SKF", inputNumber);

      if (skfError) throw skfError;

      // Query for FAG number
      const { data: fagData, error: fagError } = await supabase
        .from("wheelbearing")
        .select("*")
        .eq("FAG", inputNumber);

      if (fagError) throw fagError;

      // Combine results from both queries
      const combinedData = [...(skfData || []), ...(fagData || [])];

      if (combinedData.length === 0) {
        alert("No part found for this number.");
      } else {
        console.log(combinedData);
        // Navigate to the results page with combined data
        navigate("/results", { state: { searchResults: combinedData } });
      }
    } catch (error: any) {
      console.error("Error searching for part:", error.message);
    }
  };

  return (
    <div className="skf-search-container">
      <input
        className="skf-search-input"
        type="text"
        value={inputNumber}
        onChange={handleInputChange}
        placeholder="Enter SKF or FAG Number"
      />
      <button className="skf-search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SKFSearch;
