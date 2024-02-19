import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../assets/supaBaseClient";

const SKFSearch = () => {
  const [skfNumber, setSkfNumber] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkfNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("wheelbearing")
        .select("CD")
        .eq("SKF", skfNumber);

      if (error) throw error;

      if (data && data.length === 0) {
        alert("No part found for this SKF number.");
      } else {
        navigate("/results", { state: { searchResults: data } });
      }
    } catch (error: any) {
      console.error("Error searching for part:", error.message);
    }
  };

  return (
    <div className="skf-search">
      <input
        type="text"
        value={skfNumber}
        onChange={handleInputChange}
        placeholder="Enter SKF Number"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SKFSearch;
