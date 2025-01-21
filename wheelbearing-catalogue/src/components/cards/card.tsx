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
  openModal: () => void;

  // Additional fields
  KW?: string;
  StartYr?: string;
  EndYr?: string;
  Exactcc?: string;
  Cam?: string;
  Valve?: string;
  Gears?: string;
  Bearing2Size?: string;
  EngineCode?: string;
  FAG?: string;
  MOOG?: string;
  SKF?: string;
  SNR?: string;
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
  const placeholderImagePath = "/CDK6653.jpg"; // Direct path to the public folder

  return (
    <div className="card">
      <div className="card-image">
        <img src={placeholderImagePath} alt={CD} />{" "}
        {/* Always use the placeholder */}
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
        More Info
      </button>
    </div>
  );
};

export default Card;
