import { useState } from "react";
import ManufacturerOptions from "./manufFilter";
import ModelOptions from "./modelOptions";
// import SearchButton from "./searchButton";
import supabase from "../assets/supaBaseClient";
import EngineSizeOptions from "./EngineSizeOptions";
import ResetButton from "./Reset";
// import { useNavigate } from "react-router-dom";
// import SearchButton from "./Search";

//state variables for dropdown choices

const FilterContainer = () => {
  // const navigate = useNavigate();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  // const [selectedPosition, setSelectedPosition] = useState("");

  //dropdown event handlers
  const handleManufacturerChange = (manufacturer: string) => {
    setSelectedManufacturer(manufacturer);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const handleEngineSizeChange = (engineSize: string) => {
    setSelectedEngineSize(engineSize);
  };

  // const handlePositionChange = (position) => {
  //   setSelectedPosition(position);
  // };

  // const handleSearch = async () => {
  //   try {
  let query = supabase.from("wiperblades2").select("*");

  if (selectedManufacturer) {
    query = query.eq("Manuf", selectedManufacturer);
  }
  //     if (selectedModel) {
  //       query = query.eq("Model", selectedModel);
  //     }
  //     if (selectedBodyType) {
  //       // Use selectedBodyType
  //       query = query.eq("BodyType", selectedBodyType); // Assuming "BodyType" is the correct field
  //     }
  //     if (selectedPosition) {
  //       // Use selectedPosition
  //       query = query.eq("Position", selectedPosition); // Assuming "Position" is the correct field
  //     }

  //     const { data, error } = await query;

  //     if (error) throw error;
  //     console.log("Data returned from Supabase:", data);
  //     navigate("/results", { state: { searchResults: data } });
  //   } catch (error) {
  //     console.error("Error in search:", error.message);
  //   }
  // };

  const handleReset = () => {
    setReset((prevReset) => !prevReset);
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngineSize("");
    // setSelectedPosition("");
  };

  //component markup

  console.log(selectedModel);
  return (
    <div className="container">
      <div className="inner-container">
        <h3>Wiper blades catalogue</h3>
        <ManufacturerOptions
          onManufacturerChange={handleManufacturerChange}
          reset={reset}
        />
        <ModelOptions
          selectedManufacturer={selectedManufacturer}
          reset={reset}
          onModelChange={handleModelChange}
        />
        <EngineSizeOptions
          selectedModel={selectedModel}
          reset={reset}
          onEngineSizeChange={handleEngineSizeChange}
        />

        {/* <SearchButton onSearch={handleSearch} /> */}
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default FilterContainer;
