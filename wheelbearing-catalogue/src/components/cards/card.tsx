import React from "react";
import "../../CSS/singleCard.css";

export interface CardProps {
  CD: string;
  ModelDesc: string;
  Position: string;
  Manuf: string;
  Model: string;
  EngineSize: string;
  Years: string;
  FuelType: string;
  BodyType: string;
  Transmission: string;
  MPos: string;
  abs_note: string;
  TRWDansDRWDive: string;
  Bearing1Size: string;
  vehicleDetails?: string;
  vehicleDetails2?: string;
  imageUrl: string;
  openModal: () => void;

  // New fields added for more detailed information
  KW?: string; // Engine power
  StartYr?: string; // Start year of vehicle production
  EndYr?: string; // End year of vehicle production
  Exactcc?: string; // Engine displacement (cubic centimeters)
  Cam?: string; // Camshaft details
  Valve?: string; // Valve details
  Gears?: string; // Number of gears in the transmission
  Bearing2Size?: string; // Size of the second bearing
  EngineCode?: string; // Engine code for the vehicle
  FAG?: string; // FAG part number
  MOOG?: string; // MOOG part number
  SKF?: string; // SKF part number
  SNR?: string; // SNR part number
}

const Card: React.FC<CardProps> = ({
  CD,
  Bearing1Size,
  Manuf,
  abs_note,
  vehicleDetails,
  vehicleDetails2,
  openModal,
}) => {
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${CD}.jpg`;

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={CD} />
      </div>
      <strong>
        <p className="part-number">{Manuf} Wheelbearing kit</p>
      </strong>
      <p className="part-number">
        <strong>{CD}</strong>
      </p>
      <p className="bearing-size">
        <strong>Bearing Size:</strong> {Bearing1Size}
      </p>
      <p className="bearing-size">
        <strong>ABS:</strong> {abs_note}
      </p>
      {vehicleDetails && <p className="bearing-size">{vehicleDetails}</p>}
      {vehicleDetails2 && <p className="bearing-size">{vehicleDetails2}</p>}
      <button className="buy-button" onClick={openModal}>
        more Info
      </button>
    </div>
  );
};

export default Card;
