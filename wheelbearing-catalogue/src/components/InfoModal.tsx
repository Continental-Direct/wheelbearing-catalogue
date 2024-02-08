import React from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    imageUrl: string;
    PartNumber: string;
    ModelDesc: string;
    // Include other fields from CardProps as needed, or adjust according to your actual use case
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
          <img src={content.imageUrl} alt={content.PartNumber} />
          {/* Display additional content based on the passed `content` */}
          <p>{content.ModelDesc}</p>
          {/* Add more content display as needed */}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
