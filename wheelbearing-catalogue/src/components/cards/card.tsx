import React from "react";

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
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({ CD, Bearing1Size, Manuf, openModal }) => {
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
      <button className="buy-button" onClick={openModal}>
        View Details
      </button>
    </div>
  );
};

export default Card;