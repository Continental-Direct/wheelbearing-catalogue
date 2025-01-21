import React, { useState } from "react";
import Card from "./card";
import InfoModal from "../modals/InfoModal";
import { CardProps } from "./card";
import { useLocation } from "react-router-dom";
import "../../CSS/CardContainer.css";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";
import Footer from "../home/Footer";

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

  return (
    <div className="card-container-wrapper">
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
        {uniqueCards.length} {uniqueCards.length === 1 ? "Result" : "Results"}{" "}
        Found
      </div>
      <div className="content-container">
        <div className="card-container">
          {uniqueCards.map((data) => (
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
    </div>
  );
};

export default CardContainer;
