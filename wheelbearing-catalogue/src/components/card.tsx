import React from "react";

export interface CardProps {
  imageUrl: string;
  PartNumber: string;
  ModelDesc: string; // Changed from 'description' to 'ModelDesc'
  Position: string;
  Manuf: string; // Added manufacturer field
  Model: string; // Added model field
}
const Card: React.FC<CardProps> = ({
  PartNumber,
  Position,
  ModelDesc,
  Manuf,
  Model,
}) => {
  const buildImageUrl = (partNumber: string) => {
    return `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${partNumber}.jpg`;
  };

  // Call the function to get the image URL
  const imageUrl = buildImageUrl(PartNumber);

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
      <button className="buy-button">More Info</button>
    </div>
  );
};

export default Card;
