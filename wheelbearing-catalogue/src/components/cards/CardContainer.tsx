import React, { useState } from "react";
import Card from "./card";
import InfoModal from "../modals/InfoModal";
import { CardProps } from "./card";
import { useLocation } from "react-router-dom";
import FilterSection from "./FilterSection";
import "../../CSS/CardContainer.css";

export interface CardContainerProps {
  cardsData: CardProps[];
}

interface Filters {
  [key: string]: string[];
}

const CardContainer: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    Transmission: [],
    FuelType: [],
    BodyType: [],
    TRWDansDRWDive: [],
  });
  const location = useLocation();
  const { searchResults } = (location.state as {
    searchResults: CardProps[];
  }) || { searchResults: [] };
  console.log("Initial search results:", searchResults);

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
      // Get the previous values of the filter, or an empty array if it doesn't exist
      const prevFilterValues = prevFilters[name] || [];

      let newFilterValues;

      if (checked) {
        // If checked is true, add the new value to the filter
        newFilterValues = [...prevFilterValues, value];
      } else {
        // If checked is false, remove the new value from the filter
        newFilterValues = prevFilterValues.filter((item) => item !== value);
      }
      // Return a new filters object with the updated filter values
      return { ...prevFilters, [name]: newFilterValues };
    });
  };

  const uniqueCards = searchResults.reduce<CardProps[]>((acc, current) => {
    const x = acc.find((item) => item.CD === current.CD);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

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
    <div className="content-container">
      <FilterSection onFilterChange={onFilterChange} />
      <div className="card-container">
        {filteredResults.map((data, index) => (
          <Card key={index} {...data} openModal={() => handleOpenModal(data)} />
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
  );
};

export default CardContainer;
