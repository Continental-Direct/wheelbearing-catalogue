import { useState } from "react";
import ManufacturerOptions from "./manufFilter";
import ModelOptions from "./modelOptions";
import EngineSizeOptions from "./EngineSizeOptions";
import MarkSeriesOptions from "./MarkSeriesOptions";
import ResetButton from "./Reset";
import SearchButton from "./Search";
import supabase from "../assets/supaBaseClient";
import { useNavigate } from "react-router-dom";

const FilterContainer = () => {
  const navigate = useNavigate();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");

  const handleManufacturerChange = (manufacturer: string) => {
    setSelectedManufacturer(manufacturer);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const handleEngineSizeChange = (engineSize: string) => {
    setSelectedEngineSize(engineSize);
  };

  const handleMarkSeriesChange = (markSeries: string) => {
    setSelectedMarkSeries(markSeries);
  };

  const handleReset = () => {
    setReset((prevReset) => !prevReset);
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngineSize("");
    setSelectedMarkSeries("");
  };

  const handleSearch = async () => {
    try {
      let query = supabase.from("Wheelbearing").select("*");

      if (selectedManufacturer) {
        query = query.eq("Manuf", selectedManufacturer);
      }
      if (selectedModel) {
        query = query.eq("Model", selectedModel);
      }
      if (selectedEngineSize) {
        query = query.eq("EngineSize", selectedEngineSize);
      }
      if (selectedMarkSeries) {
        query = query.eq("mark_series", selectedMarkSeries);
      }

      const { data, error } = await query;

      if (error) throw error;
      console.log("Data returned from Supabase:", data);
      navigate("/results", { state: { searchResults: data } });
    } catch (error) {
      console.error("Error in search:", (error as any).message);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h3>Wheelbearing catalogue</h3>
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
        <MarkSeriesOptions
          selectedModel={selectedModel}
          selectedEngineSize={selectedEngineSize}
          reset={reset}
          onMarkSeriesChange={handleMarkSeriesChange}
        />
        <SearchButton onSearch={handleSearch} />
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default FilterContainer;
