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
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({
  CD,
  ModelDesc,
  MPos,
  Manuf,
  Years,
  Transmission,
  abs_note,
  FuelType,
  openModal,
}) => {
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${CD}.jpg`;

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={CD} />
      </div>
      <div className="card-info">
        <p className="product-name">{Manuf}</p>
        <p className="model-desc">{ModelDesc}</p>
        <p className="product-name">{CD}</p>
        <p className="position">{MPos}</p>
        <p className="position">{Years}</p>
        <p className="position">{Transmission}</p>
        <p className="position">{FuelType}</p>
        <p className="position">{abs_note}</p>
      </div>
      <button className="buy-button" onClick={openModal}>
        View
      </button>
    </div>
  );
};

export default Card;
