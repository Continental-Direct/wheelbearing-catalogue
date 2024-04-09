import React, { useState } from "react";
import ManufacturerOptions from "../dropdowns/manufOptions";
import ModelOptions from "../dropdowns/modelOptions";
import EngineSizeOptions from "../dropdowns/EngineSizeOptions";
import MarkSeriesOptions from "../dropdowns/MarkSeriesOptions";
import ResetButton from "../buttons/Reset";
import SearchButton from "../buttons/Search";
import supabase from "../../assets/supaBaseClient";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import DriveTypeOptions from "../dropdowns/YearsOptions";
import FitmentOptions from "../dropdowns/FitmentOptions";
import SKFSearch from "../dropdowns/SKFSearch";
import ImageSlider from "./carousel";
import Reviews from "./Reviews";

const FilterContainer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");
  const [selectedDriveType, setSelectedDriveType] = useState<string>("");
  const [selectedMPos, setSelectedMPos] = useState<string>("");

  const handleMPosChange = (mpos: string) => {
    setSelectedMPos(mpos);
  };
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

  const handleDriveTypeChange = (driveType: string) => {
    setSelectedDriveType(driveType);
  };

  const handleReset = () => {
    setReset(!reset);
    setSelectedManufacturer("");
    setSelectedModel("");
    setSelectedEngineSize("");
    setSelectedMarkSeries("");
    setSelectedDriveType("");
    setSelectedMPos("");
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
      if (selectedDriveType) {
        query = query.eq("TRWDansDRWDive", selectedDriveType);
      }
      if (selectedMPos) {
        query = query.eq("MPos", selectedMPos);
      }

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
          <DriveTypeOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedMarkSeries={selectedMarkSeries}
            reset={reset}
            onDriveTypeChange={handleDriveTypeChange}
          />
          <FitmentOptions
            selectedModel={selectedModel}
            selectedEngineSize={selectedEngineSize}
            selectedMarkSeries={selectedMarkSeries}
            selectedDriveType={selectedDriveType}
            reset={reset}
            onMPosChange={handleMPosChange}
          />
          <SearchButton onSearch={handleSearch} />
          <ResetButton onReset={handleReset} />
        </div>
        <SKFSearch />
      </div>
      <div className="wheelbearing-info">
        <div className="home-img-container">
          <img
            className="home-img"
            src="CD-WBK-Main.webp"
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
      <div style={{ width: "30%", height: "600px" }}>
        <ImageSlider />
      </div>
      <Reviews />
      <Footer />
    </div>
  );
};

export default FilterContainer;
