import React from "react";

const ImageModal = ({ isOpen, onClose, imageUrl }: { isOpen: boolean, onClose: () => void, imageUrl: string }) => {
  React.useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? onClose() : null);
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
          backgroundColor: "#fff",
          borderRadius: 5,
          position: "relative",
        }}
      >
        <img
          src={imageUrl}
          alt="Enlarged"
          style={{ maxWidth: "50vw", maxHeight: "50vh" }}
        />
        <button
          onClick={onClose}
          style={{
            display: "block",
            marginTop: 10,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
