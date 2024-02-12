import React, { useState } from "react";
import Card from "./components/card";
import InfoModal from "./components/InfoModal";
import { CardProps } from "./components/card";
import { useLocation } from "react-router-dom";
import FilterSection from "./FilterSection";

export interface CardContainerProps {
  cardsData: CardProps[];
}

const CardContainer: React.FC = () => {
  const location = useLocation();
  const { searchResults } = (location.state as {
    searchResults: CardProps[];
  }) || { searchResults: [] };
  const [filters, setFilters] = useState<{ Transmission: string[] }>({
    Transmission: [],
  });
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
    Fitment: string;
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
      Fitment: data.Fitment,
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
      if (name === "Transmission") {
        const newTransmissionFilters = checked
          ? [...prevFilters.Transmission, value]
          : prevFilters.Transmission.filter((item) => item !== value);
        return { ...prevFilters, Transmission: newTransmissionFilters };
      }
      return prevFilters; // Ensure previous filters are returned if no conditions are met
    });
  };
  const filteredResults = searchResults.filter((data) =>
    filters.Transmission.length > 0
      ? filters.Transmission.includes(data.Transmission)
      : true
  );
  return (
    <>
      <div className="content-container">
        <FilterSection onFilterChange={onFilterChange} />
        <div className="card-container">
          {filteredResults.map((data, index) => (
            <Card
              key={index}
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
