import React, { useState, ChangeEvent, FormEvent } from "react";
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

// RequestPriceForm component encapsulating the request price form.
interface RequestPriceFormProps {
  onBack: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    contactMethod: string;
    message?: string;
  }) => void;
}

const RequestPriceForm: React.FC<RequestPriceFormProps> = ({
  onBack,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "email", // default selection
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you can add form validation or integration with your backend.
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="request-price-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>How would you like to receive the price?</label>
        <div className="radio-group">
          <input
            type="radio"
            id="contactEmail"
            name="contactMethod"
            value="email"
            checked={formData.contactMethod === "email"}
            onChange={handleChange}
          />
          <label htmlFor="contactEmail">Email</label>
          <input
            type="radio"
            id="contactPhone"
            name="contactMethod"
            value="phone"
            checked={formData.contactMethod === "phone"}
            onChange={handleChange}
          />
          <label htmlFor="contactPhone">Phone</label>
        </div>
      </div>
      <div>
        <label>Optional Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="modal-buttons">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="submit">Request</button>
      </div>
    </form>
  );
};

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing2/bearing_img/${content.CD}.jpg`;

  // Handle form submission (expand this to integrate with your backend as needed)
  const handleFormSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    contactMethod: string;
    message?: string;
  }) => {
    console.log("Request Price Data:", data);
    // Optionally, show a confirmation message or close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          {showRequestForm ? (
            <RequestPriceForm
              onBack={() => setShowRequestForm(false)}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <>
              <img
                className="modal-image"
                src={imageUrl}
                alt={content.CD}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/CDK-Soon.jpg";
                }}
              />
              <div className="text-content">
                <ul className="modal-info">
                  {Object.entries(content)
                    .filter(([key, value]) => key !== "imageUrl" && value)
                    .map(([key, value], index) => (
                      <li key={index}>
                        <span className="modal-category">{key}:</span>
                        <span className="modal-value">{value}</span>
                      </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                  <button
                    className="search-button"
                    onClick={() => setShowRequestForm(true)}
                  >
                    Request Price
                  </button>
                  <button className="search-button" onClick={onClose}>
                    Back
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
