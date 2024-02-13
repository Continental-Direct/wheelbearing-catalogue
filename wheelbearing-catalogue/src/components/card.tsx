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
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({
  CD,
  ModelDesc,
  MPos,
  Manuf,
  Model,
  Years,
  Transmission,
  openModal,
}) => {
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${CD}.jpg`;

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={CD} />
      </div>
      <div className="card-info">
        <h3 className="product-name">{CD}</h3>
        <p className="product-name">
          {Manuf} {Model}
        </p>
        <p className="model-desc">{ModelDesc}</p>
        <p className="position">{MPos}</p>
        <p className="position">{Years}</p>
        <p className="position">{Transmission}</p>
        <p className="price">**price placeholder**</p>
      </div>
      <button className="buy-button" onClick={openModal}>
        View
      </button>
    </div>
  );
};

export default Card;
