import React from "react";

export interface CardProps {
  imageUrl: string;
  PartNumber: string;
  description: string;
  position: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  PartNumber,
  description,
  position,
}) => {
  return (
    <div className="card">
      <div className="card-logo">
        <img src="./continental.png" alt="Continental" className="logo" />
      </div>
      <div className="card-image">
        <img src={imageUrl} alt={PartNumber} />
      </div>
      <div className="card-info">
        <h3 className="product-name">{PartNumber}</h3>
        <p className="description">{description}</p>
        <p className="price">**price placeholder**</p>
        <p className="position">{position}</p>
        <p className="part-number">{PartNumber}</p>
      </div>
      <button className="buy-button">View More</button>
    </div>
  );
};

export default Card;
