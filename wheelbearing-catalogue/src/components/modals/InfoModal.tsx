import React from "react";
import "../../CSS/modal.css";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    imageUrl: string;
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
    KW?: string;
    StartYr?: string;
    EndYr?: string;
    Exactcc?: string;
    Cam?: string;
    Valve?: string;
    Gears?: string;
    Bearing1Size?: string;
    Bearing2Size?: string;
    vehicleDetails?: string;
    vehicleDetails2?: string;
    abs_note?: string;
    EngineCode?: string;
    FAG?: string;
    MOOG?: string;
    SKF?: string;
    SNR?: string;
  };
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  // Array of label and corresponding value from content
  const fields = [
    { label: "Description", value: content.ModelDesc },
    { label: "Engine Size", value: content.EngineSize },
    { label: "Years", value: content.Years },
    { label: "Fuel Type", value: content.FuelType },
    { label: "Part Number", value: content.CD },
    { label: "Body Type", value: content.BodyType },
    { label: "Transmission", value: content.Transmission },
    { label: "Fitment", value: content.MPos },
    { label: "Drive Type", value: content.TRWDansDRWDive },
    { label: "Power (KW)", value: content.KW },
    { label: "Start Year", value: content.StartYr },
    { label: "End Year", value: content.EndYr },
    { label: "Exact CC", value: content.Exactcc },
    { label: "Cam", value: content.Cam },
    { label: "Valve", value: content.Valve },
    { label: "Gears", value: content.Gears },
    { label: "Bearing 1 Size", value: content.Bearing1Size },
    { label: "Bearing 2 Size", value: content.Bearing2Size },
    { label: "Vehicle Details", value: content.vehicleDetails },
    { label: "Additional Details", value: content.vehicleDetails2 },
    { label: "ABS Note", value: content.abs_note },
    { label: "Engine Code", value: content.EngineCode },
    { label: "FAG Part Number", value: content.FAG },
    { label: "MOOG Part Number", value: content.MOOG },
    { label: "SKF Part Number", value: content.SKF },
    { label: "SNR Part Number", value: content.SNR },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <img
            className="modal-image"
            src={content.imageUrl}
            alt={content.CD}
          />
          <div className="text-content">
            <h3>Details</h3>
            <ul className="modal-info">
              {fields
                .filter((field) => field.value) // Only display fields with a value
                .map((field, index) => (
                  <li key={index}>
                    <span className="modal-category">{field.label}: </span>
                    {field.value}
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
