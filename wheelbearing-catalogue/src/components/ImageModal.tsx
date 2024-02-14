import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  PartNumber: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  PartNumber,
}) => {
  React.useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => document.body.removeEventListener("keydown", closeOnEscapeKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 5,
          position: "relative",
          color: "black",
        }}
      >
        <img
          src={imageUrl}
          alt="Enlarged"
          style={{ maxWidth: "50vw", maxHeight: "50vh" }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            userSelect: "none",
            padding: "5px 10px",
            background: "#f00",
            color: "#fff",
            borderRadius: "50%",
          }}
          onClick={onClose}
        >
          X
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          Part Number: {PartNumber}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
