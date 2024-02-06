import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const handleResetClick = () => {
    onReset();
  };

  return (
    <button className="button red" onClick={handleResetClick}>
      Reset Filters
    </button>
  );
};

export default ResetButton;
