import React from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    imageUrl: string;
    PartNumber: string;
    ModelDesc: string;
    Manuf: string; // Include manufacturer
    Model: string; // Include model
    // Include other fields from CardProps as needed
  };
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-body">
          <img
            className="modal-image"
            src={content.imageUrl}
            alt={content.PartNumber}
          />
          <div className="text-content">
            <p className="name">
              {content.Manuf} {content.Model}
            </p>
            <h3>Details</h3>
            <ul className="modal-info">
              <li>{content.ModelDesc}</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
              <li>Placeholder</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
