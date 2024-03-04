import React, { useState } from "react";
import Card from "./card";
import InfoModal from "../modals/InfoModal";
import { CardProps } from "./card";
import { useLocation } from "react-router-dom";
import FilterSection from "./FilterSection";
import "../../CSS/CardContainer.css";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";

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
  console.log("Original searchResults length:", searchResults.length);
  const uniqueCheck = new Set(searchResults.map((item) => item.CD));
  console.log("Unique CDs length:", uniqueCheck.size);

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
  } | null>(null);
  const handleOpenModal = (data: CardProps) => {
    const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${data.CD}.jpg`;
    setModalContent({
      imageUrl,
      CD: data.CD,
      ModelDesc: data.ModelDesc,
      Manuf: data.Manuf,
      Model: data.Model,
      EngineSize: data.EngineSize,
      Years: data.Years,
      FuelType: data.FuelType,
      BodyType: data.BodyType,
      Transmission: data.Transmission,
      MPos: data.MPos,
      TRWDansDRWDive: data.TRWDansDRWDive,
    });
    setIsModalOpen(true);
    console.log("Modal content:");
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
          acc.set(trimmedCD, { ...current, CD: trimmedCD }); //
        }
        return acc;
      }, new Map())
      .values()
  );

  console.log("Final unique cards count:", uniqueCards.length);
  uniqueCards.forEach((card) =>
    console.log(`CD: ${card.CD}, ImageURL: ${card.imageUrl}`)
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
  console.log(
    "Rendering CDs:",
    filteredResults.map((data) => data.CD)
  );

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
    </>
  );
};

export default CardContainer;
