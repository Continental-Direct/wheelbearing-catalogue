import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../assets/supaBaseClient";

import ManufacturerOptions from "../dropdowns/manufOptions";
import ModelOptions from "../dropdowns/modelOptions";
import EngineSizeOptions from "../dropdowns/EngineSizeOptions";
import BodyTypeOptions from "../dropdowns/BodyTypeOptions";
import TransmissionOptions from "../dropdowns/TransmissionOptions";
import MarkSeriesOptions from "../dropdowns/MarkSeriesOptions";
import DriveTypeOptions from "../dropdowns/YearsOptions";
import FitmentOptions from "../dropdowns/FitmentOptions";
import SKFSearch from "../dropdowns/SKFSearch";
import Footer from "./Footer";

const FilterContainer: React.FC = () => {
  const navigate = useNavigate();

  // State for each dropdown
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");
  const [selectedDriveType, setSelectedDriveType] = useState<string>("");
  const [selectedMPos, setSelectedMPos] = useState<string>("");

  // Other states
  const [reset, setReset] = useState<boolean>(false);
  const [canSearch, setCanSearch] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  // Enable the search button only if all dropdowns are filled
  useEffect(() => {
    setCanSearch(
      !!(
        selectedManufacturer &&
        selectedModel &&
        selectedEngineSize &&
        selectedBodyType &&
        selectedTransmission &&
        selectedMarkSeries &&
        selectedDriveType &&
        selectedMPos
      )
    );
  }, [
    selectedManufacturer,
    selectedModel,
    selectedEngineSize,
    selectedBodyType,
    selectedTransmission,
    selectedMarkSeries,
    selectedDriveType,
    selectedMPos,
  ]);

  // Reset all dropdowns
  const handleReset = () => {
    setReset(!reset);
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngineSize("");
    setSelectedBodyType("");
    setSelectedTransmission("");
    setSelectedMarkSeries("");
    setSelectedDriveType("");
    setSelectedMPos("");
    setSearchAttempted(false);
  };

  // Perform the search with all selected filters
  const handleSearch = async () => {
    setSearchAttempted(true);
    if (!canSearch) return;

    try {
      let query = supabase.from("wheelbearing2").select("*");

      if (selectedManufacturer) query = query.eq("Manuf", selectedManufacturer);
      if (selectedModel) query = query.eq("Model", selectedModel);
      if (selectedEngineSize)
        query = query.eq("EngineSize", selectedEngineSize);
      if (selectedBodyType) query = query.eq("BodyType", selectedBodyType);
      if (selectedTransmission)
        query = query.eq("Transmission", selectedTransmission);
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
            selectedBodyType,
            selectedTransmission,
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
      <img
        src={"/continental.png"}
        alt="Continental Direct Logo"
        className="home-img"
      />
      <div className="orange-gradient-box">
        <h2>CD WHEELBEARINGS</h2>
        <p>IDENTIFY THE CORRECT PART FOR YOUR VEHICLE</p>
      </div>

      <div className="inner-container">
        <h3 className="filter-title">ENTER VEHICLE DETAILS</h3>

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
          <BodyTypeOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            reset={reset}
            onBodyTypeChange={setSelectedBodyType}
          />
          <TransmissionOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedBodyType={selectedBodyType}
            reset={reset}
            onTransmissionChange={setSelectedTransmission}
          />
          <MarkSeriesOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedBodyType={selectedBodyType} // NEW
            selectedTransmission={selectedTransmission} // NEW
            reset={reset}
            onMarkSeriesChange={setSelectedMarkSeries}
          />

          <DriveTypeOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedBodyType={selectedBodyType} // NEW
            selectedTransmission={selectedTransmission} // NEW
            selectedMarkSeries={selectedMarkSeries}
            reset={reset}
            onDriveTypeChange={setSelectedDriveType}
          />

          <FitmentOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedBodyType={selectedBodyType} // NEW
            selectedTransmission={selectedTransmission} // NEW
            selectedMarkSeries={selectedMarkSeries}
            selectedDriveType={selectedDriveType}
            reset={reset}
            onMPosChange={setSelectedMPos}
          />
        </div>

        <div className="buttons-container">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
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
