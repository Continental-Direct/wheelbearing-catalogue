import React from "react";
import "../../CSS/modal.css";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    CD: string;
    ModelDesc: string;
    Manuf: string;
    Model: string;
    EngineSize: string;
    Years: string;
    FuelType: string;
    BodyType: string;
    Transmission: string;
    MPos: string;
    TRWDansDRWDive: string;
    Bearing1Size?: string;
    vehicleDetails?: string;
    vehicleDetails2?: string;
    abs_note?: string;
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
  };
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const placeholderImagePath = "/CDK6653.jpg"; // Direct path to the public folder

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <img
            className="modal-image"
            src={placeholderImagePath} // Always use the placeholder
            alt={content.CD}
          />
          <div className="text-content">
            <h3>Details</h3>
            <ul className="modal-info">
              {Object.entries(content)
                .filter(([key, value]) => key !== "imageUrl" && value)
                .map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key}: </strong>
                    {value}
                  </li>
                ))}
            </ul>
            <div className="modal-buttons">
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
