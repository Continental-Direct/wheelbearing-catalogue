import React from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    imageUrl: string;
    PartNumber: string;
    ModelDesc: string;
    Manuf: string;
    Model: string;
    EngineSize: string; 
    Years: string; 
    FuelType: string; 
    BodyType: string; 
    Transmission: string; 
    Fitment: string; 
   
  };
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <img
            className="modal-image"
            src={content.imageUrl}
            alt={content.PartNumber}
          />
          <div className="text-content">
            <p className="name">
              {content.Manuf} {content.Model} Wheelbearing Kit
            </p>
            <h3>Details</h3>
            <ul className="modal-info">
              <li>
                <span className="modal-category">Description: </span>
                {content.ModelDesc}
              </li>
              <li>
                <span className="modal-category">Engine Size: </span>
                {content.EngineSize}
              </li>
              <li>
                <span className="modal-category">Years: </span> {content.Years}
              </li>
              <li>
                <span className="modal-category">Fuel Type: </span>
                {content.FuelType}
              </li>
              <li>
                <span className="modal-category">Part Number: </span>
                {content.PartNumber}
              </li>
              <li>
                <span className="modal-category">Body Type: </span>
                {content.BodyType}
              </li>
              <li>
                <span className="modal-category">Transmission: </span>
                {content.Transmission}
              </li>
              <li>
                <span className="modal-category">Fitment: </span>
                {content.Fitment}
              </li>
            </ul>
            <div className="modal-buttons">
              <button className="buy-now-button">Buy now</button>
              <button className="back-to-menu-button" onClick={onClose}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
