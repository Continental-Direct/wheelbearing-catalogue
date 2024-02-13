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
  Model,
  MPos,
  Manuf,
  Years,
  Transmission,
  abs_note,
  FuelType,
  BodyType,
  openModal,
}) => {
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${CD}.jpg`;

  return (
    <div className="card">
      <div className="card-image">
        <img src={imageUrl} alt={CD} />
      </div>
      <div className="card-content">
        <div className="card-info">
          <div className="card-details">
            <div className="card-column">
              <p>
                <strong>Manuf</strong>
                <br />
                {Manuf}
              </p>
              <p>
                <strong>Model:</strong>
                <br />
                {Model}
              </p>
              <p>
                <strong>Body Type:</strong>
                <br />
                {BodyType}
              </p>
            </div>
            <div className="card-column">
              <p>
                <strong>Part:</strong> <br />
                {CD}
              </p>
              <p>
                <strong>Transmission:</strong> <br />
                {Transmission}
              </p>
              <p>
                <strong>ABS:</strong> <br />
                {abs_note}
              </p>
            </div>
            <div className="card-column">
              <p>
                <strong>Years:</strong>
                <br /> {Years}
              </p>

              <p>
                <strong>Fuel Type:</strong>
                <br /> {FuelType}
              </p>

              <p>
                <strong>Positon:</strong> <br /> {MPos}
              </p>
            </div>
          </div>
          {/* <p className="position">{abs_note}</p> */}
        </div>
        <button className="buy-button" onClick={openModal}>
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
