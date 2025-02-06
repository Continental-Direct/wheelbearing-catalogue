import React, { useState, useEffect } from "react";
import ManufacturerOptions from "../dropdowns/manufOptions";
import ModelOptions from "../dropdowns/modelOptions";
import EngineSizeOptions from "../dropdowns/EngineSizeOptions";
import MarkSeriesOptions from "../dropdowns/MarkSeriesOptions";
import ResetButton from "../buttons/Reset";
import SearchButton from "../buttons/Search";
import DriveTypeOptions from "../dropdowns/YearsOptions";
import FitmentOptions from "../dropdowns/FitmentOptions";
import SKFSearch from "../dropdowns/SKFSearch";
import { useNavigate } from "react-router-dom";
import supabase from "../../assets/supaBaseClient";
import Footer from "./Footer";

const FilterContainer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");
  const [selectedDriveType, setSelectedDriveType] = useState<string>("");
  const [selectedMPos, setSelectedMPos] = useState<string>("");

  const [canSearch, setCanSearch] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  useEffect(() => {
    setCanSearch(
      !!(
        selectedManufacturer &&
        selectedModel &&
        selectedEngineSize &&
        selectedMarkSeries &&
        selectedDriveType &&
        selectedMPos
      )
    );
  }, [
    selectedManufacturer,
    selectedModel,
    selectedEngineSize,
    selectedMarkSeries,
    selectedDriveType,
    selectedMPos,
  ]);

  const handleReset = () => {
    setReset(!reset);
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngineSize("");
    setSelectedMarkSeries("");
    setSelectedDriveType("");
    setSelectedMPos("");
    setSearchAttempted(false);
  };

  const handleSearch = async () => {
    setSearchAttempted(true);
    if (!canSearch) return;

    try {
      let query = supabase.from("wheelbearing2").select("*");

      if (selectedManufacturer) query = query.eq("Manuf", selectedManufacturer);
      if (selectedModel) query = query.eq("Model", selectedModel);
      if (selectedEngineSize)
        query = query.eq("EngineSize", selectedEngineSize);
      if (selectedMarkSeries)
        query = query.eq("mark_series", selectedMarkSeries);
      if (selectedDriveType)
        query = query.eq("TRWDansDRWDive", selectedDriveType);
      if (selectedMPos) query = query.eq("MPos", selectedMPos);

      const { data, error } = await query;
      if (error) throw error;

      navigate("/results", {
        state: {
          searchResults: data,
          filterChoices: {
            selectedManufacturer,
            selectedModel,
            selectedEngineSize,
            selectedMarkSeries,
            selectedDriveType,
            selectedMPos,
          },
        },
      });
    } catch (error: any) {
      console.error("Error in search:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="orange-gradient-box">
        <h2>CD PRODUCT CATALOGUES</h2>
        <p>IDENTIFY THE CORRECT PART FOR YOUR VEHICLE</p>
      </div>

      <div className="inner-container">
        <h3 className="filter-title">WHEEL BEARING CATALOGUE</h3>

        <div className="dropdown-column">
          <ManufacturerOptions
            onManufacturerChange={setSelectedManufacturer}
            reset={reset}
          />
          <ModelOptions
            selectedManufacturer={selectedManufacturer}
            reset={reset}
            onModelChange={setSelectedModel}
          />
          <EngineSizeOptions
            selectedModel={selectedModel}
            reset={reset}
            onEngineSizeChange={setSelectedEngineSize}
          />
          <MarkSeriesOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            reset={reset}
            onMarkSeriesChange={setSelectedMarkSeries}
          />
          <DriveTypeOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedMarkSeries={selectedMarkSeries}
            reset={reset}
            onDriveTypeChange={setSelectedDriveType}
          />
          <FitmentOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedMarkSeries={selectedMarkSeries}
            selectedDriveType={selectedDriveType}
            reset={reset}
            onMPosChange={setSelectedMPos}
          />
        </div>

        <div className="buttons-container">
          <SearchButton onSearch={handleSearch} />
          <ResetButton onReset={handleReset} />
        </div>

        {searchAttempted && !canSearch && (
          <p className="error-message">
            Please fill out all dropdowns before searching.
          </p>
        )}

        <SKFSearch />
      </div>

      <Footer />
    </div>
  );
};

export default FilterContainer;
