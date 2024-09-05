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
  Fueltype: string;
  TRWDansDRWDive: string;
  Bearing1Size: string;
  vehicleDetails?: string;
  vehicleDetails2?: string;
  imageUrl: string;
  openModal: () => void;
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
