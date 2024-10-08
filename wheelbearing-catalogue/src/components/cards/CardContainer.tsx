import React, { useState } from "react";
import Card from "./card";
import InfoModal from "../modals/InfoModal";
import { CardProps } from "./card";
import { useLocation } from "react-router-dom";
import FilterSection from "./FilterSection";
import "../../CSS/CardContainer.css";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";
import Footer from "../home/Footer";

export interface CardContainerProps {
  cardsData: CardProps[];
}

interface Filters {
  [key: string]: string[];
}

interface LocationState {
  searchResults: CardProps[];
  filterChoices: {
    selectedManufacturer: string;
    selectedModel: string;
    selectedEngineSize: string;
    selectedMarkSeries: string;
    selectedDriveType: string;
    selectedMPos: string;
  };
}

const CardContainer: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    Transmission: [],
    FuelType: [],
    BodyType: [],
    TRWDansDRWDive: [],
  });

  const location = useLocation();

  const { searchResults, filterChoices } =
    (location.state as LocationState) || {
      searchResults: [],
      filterChoices: undefined,
    };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    imageUrl: string;
    CD: string;
    ModelDesc: string;
    Manuf: string;
    Model: string;
    EngineSize: string;
    Years: string;
    FuelType: string;
    BodyType: string;
    Transmission: string;
    MPos: string;
    TRWDansDRWDive: string;
    KW: string;
    StartYr: string;
    EndYr: string;
    Exactcc: string;
    Cam: string;
    Valve: string;
    Gears: string;
    Bearing1Size: string;
    Bearing2Size: string;
    vehicleDetails: string;
    vehicleDetails2: string;
    abs_note: string;
    EngineCode: string;
    FAG: string;
    MOOG: string;
    SKF: string;
    SNR: string;
  } | null>(null);

  const handleOpenModal = (data: CardProps) => {
    const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${data.CD}.jpg`;

    setModalContent({
      imageUrl,
      CD: data.CD || "",
      ModelDesc: data.ModelDesc || "",
      Manuf: data.Manuf || "",
      Model: data.Model || "",
      EngineSize: data.EngineSize || "",
      Years: data.Years || "",
      FuelType: data.FuelType || "",
      BodyType: data.BodyType || "",
      Transmission: data.Transmission || "",
      MPos: data.MPos || "",
      TRWDansDRWDive: data.TRWDansDRWDive || "",
      KW: data.KW || "",
      StartYr: data.StartYr || "",
      EndYr: data.EndYr || "",
      Exactcc: data.Exactcc || "",
      Cam: data.Cam || "",
      Valve: data.Valve || "",
      Gears: data.Gears || "",
      Bearing1Size: data.Bearing1Size || "",
      Bearing2Size: data.Bearing2Size || "",
      vehicleDetails: data.vehicleDetails || "",
      vehicleDetails2: data.vehicleDetails2 || "",
      abs_note: data.abs_note || "",
      EngineCode: data.EngineCode || "",
      FAG: data.FAG || "",
      MOOG: data.MOOG || "",
      SKF: data.SKF || "",
      SNR: data.SNR || "",
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const onFilterChange = (name: string, value: string, checked: boolean) => {
    setFilters((prevFilters) => {
      const prevFilterValues = prevFilters[name] || [];
      let newFilterValues;

      if (checked) {
        newFilterValues = [...prevFilterValues, value];
      } else {
        newFilterValues = prevFilterValues.filter((item) => item !== value);
      }
      return { ...prevFilters, [name]: newFilterValues };
    });
  };

  const uniqueCards = Array.from(
    searchResults
      .reduce((acc, current) => {
        const trimmedCD = current.CD.trim();
        if (!acc.has(trimmedCD)) {
          acc.set(trimmedCD, { ...current, CD: trimmedCD });
        }
        return acc;
      }, new Map())
      .values()
  );

  const filteredResults = uniqueCards.filter((data) => {
    const matchesTransmission =
      filters.Transmission.length === 0 ||
      filters.Transmission.includes(data.Transmission);
    const matchesFuelType =
      filters.FuelType.length === 0 || filters.FuelType.includes(data.FuelType);
    const matchesBodyType =
      filters.BodyType.length === 0 || filters.BodyType.includes(data.BodyType);
    const matchesDriveType =
      filters.TRWDansDRWDive.length === 0 ||
      filters.TRWDansDRWDive.includes(data.TRWDansDRWDive);

    return (
      matchesTransmission &&
      matchesFuelType &&
      matchesBodyType &&
      matchesDriveType
    );
  });

  return (
    <>
      {filterChoices && (
        <SelectedFiltersDisplay
          manufacturer={filterChoices.selectedManufacturer || ""}
          model={filterChoices.selectedModel || ""}
          engineSize={filterChoices.selectedEngineSize || ""}
          markSeries={filterChoices.selectedMarkSeries || ""}
          driveType={filterChoices.selectedDriveType || ""}
          mPos={filterChoices.selectedMPos || ""}
        />
      )}
      <div className="results-header">
        {filteredResults.length}{" "}
        {filteredResults.length === 1 ? "Result" : "Results"} Found
      </div>
      <div className="content-container">
        <FilterSection onFilterChange={onFilterChange} />
        <div className="card-container">
          {filteredResults.map((data) => (
            <Card
              key={data.CD}
              {...data}
              openModal={() => handleOpenModal(data)}
            />
          ))}
        </div>
        {isModalOpen && modalContent && (
          <InfoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={modalContent}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CardContainer;
