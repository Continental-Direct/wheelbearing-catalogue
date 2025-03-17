import React, { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import "../../CSS/modal.css";

// Hard-coded EmailJS configuration (for testing purposes only)
const EMAILJS_SERVICE_ID = "service_yekcptf";
const EMAILJS_TEMPLATE_ID = "template_lnu01lc";
const EMAILJS_USER_ID = "ZXVDob_g72ZecgQKm";

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
    contactMethod: "email",
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
          <label htmlFor="contactEmail" className="radio-label">
            <input
              type="radio"
              id="contactEmail"
              name="contactMethod"
              value="email"
              checked={formData.contactMethod === "email"}
              onChange={handleChange}
            />
            Email
          </label>

          <label htmlFor="contactPhone" className="radio-label">
            <input
              type="radio"
              id="contactPhone"
              name="contactMethod"
              value="phone"
              checked={formData.contactMethod === "phone"}
              onChange={handleChange}
            />
            Phone
          </label>
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
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="request-button">
          Request
        </button>
      </div>
    </form>
  );
};

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing2/bearing_img/${content.CD}.jpg`;

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    contactMethod: string;
    message?: string;
  }) => {
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      contact_method: data.contactMethod,
      message: data.message || "",
      part_number: content.CD, // part number from the product content
    };

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );
      console.log("Email sent successfully:", result.text);
      setSuccessMessage(
        "Your request has been sent and we will contact you shortly."
      );
    } catch (error) {
      console.error("Error sending email:", error);
      // Optionally, you can set an error message here.
    }
  };

  // If the modal isn't open, don't render anything.
  if (!isOpen) return null;

  // If there's a success message, display that instead of the form/details.
  if (successMessage) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <p>{successMessage}</p>
            <div className="modal-buttons">
              <button onClick={onClose} className="request-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  <button onClick={onClose} className="back-button">
                    Back
                  </button>
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="request-button"
                  >
                    Request Price
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
