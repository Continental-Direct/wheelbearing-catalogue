import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../assets/supaBaseClient";
import "../../CSS/skf.css";

const SKFSearch = () => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const inputNumberLowercase = inputNumber.toLowerCase();
      const { data: skfData, error: skfError } = await supabase
        .from("wheelbearing2")
        .select("*")
        .ilike("SKF", `%${inputNumberLowercase}%`);

      if (skfError) throw skfError;

      const { data: fagData, error: fagError } = await supabase
        .from("wheelbearing2")
        .select("*")
        .ilike("FAG", `%${inputNumberLowercase}%`);

      if (fagError) throw fagError;

      const combinedData = [...(skfData || []), ...(fagData || [])];

      if (combinedData.length === 0) {
        alert("No part found for this number.");
      } else {
        console.log(combinedData);

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
