import React from "react";


export interface CardProps {
  PartNumber: string;
  ModelDesc: string;
  Position: string;
  Manuf: string;
  Model: string;
  EngineSize: string;
  Years: string;
  FuelType: string;
  BodyType: string;
  Transmission: string;
  Fitment: string;
  openModal: () => void;
}

const Card: React.FC<CardProps> = ({
  PartNumber,
  ModelDesc,
  Position,
  Manuf,
  Model,
  openModal,
}) => {

  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${PartNumber}.jpg`;

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={PartNumber} />
      </div>
      <div className="card-info">
        <h3 className="product-name">{PartNumber}</h3>
        <p className="product-name">
          {Manuf} {Model}
        </p>
        <p className="model-desc">{ModelDesc}</p>
        <p className="price">**price placeholder**</p>
        <p className="position">{Position}</p>
      </div>
      <button className="buy-button" onClick={openModal}>
        View
      </button>
    </div>
  );
};

export default Card;
