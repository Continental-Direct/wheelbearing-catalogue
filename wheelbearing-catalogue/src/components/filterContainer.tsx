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
      let query = supabase.from("wheelbearing2").select("*");

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
        <h2 className="filter-title">Wheelbearing catalogue</h2>
        <div className="dropdown-container">
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
      <div className="wheelbearing-info">
        <div className="home-img-container">
          <img
            className="home-img"
            src="wheelbearings.png"
            alt="wheelbearings"
          />
        </div>
        <div className="home-info">
          <h3>CD Wheel Bearings</h3>
          <p>
            All generation wheel bearings and hubs. Featuring the highest
            quality, all kits are complete with any ancillary components
            required to complete the installation correctly. 100% coverage for
            all popular applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
