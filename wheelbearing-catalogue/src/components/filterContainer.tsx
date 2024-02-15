import { useState } from "react";
import ManufacturerOptions from "./manufFilter";
import ModelOptions from "./modelOptions";
import EngineSizeOptions from "./EngineSizeOptions";
import MarkSeriesOptions from "./MarkSeriesOptions";
import ResetButton from "./Reset";
import SearchButton from "./Search";
import supabase from "../assets/supaBaseClient";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import YearsOptions from "./YearsOptions";

const FilterContainer = () => {
  const navigate = useNavigate();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

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

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
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
      let query = supabase.from("wheelbearing").select("*");

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
      if (selectedYear) {
        query = query.eq("Years", selectedYear);
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
        <h3 className="filter-title">WHEEL BEARING CATALOGUE</h3>
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
          <YearsOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedMarkSeries={selectedMarkSeries}
            reset={reset}
            onYearsChange={handleYearChange}
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
          <h3>CD WHEEL BEARINGS</h3>
          <p>
            All generation wheel bearings and hubs. Featuring the highest
            quality, all kits are complete with any ancillary components
            required to complete the installation correctly. 100% coverage for
            all popular applications.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilterContainer;
