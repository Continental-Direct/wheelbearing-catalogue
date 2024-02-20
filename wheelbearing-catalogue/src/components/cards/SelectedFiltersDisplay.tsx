import React from "react";

interface SelectedFiltersDisplayProps {
  manufacturer: string;
  model: string;
  engineSize: string;
  markSeries: string;
  driveType: string;
  mPos: string;
}

const SelectedFiltersDisplay: React.FC<SelectedFiltersDisplayProps> = ({
  manufacturer,
  model,
  engineSize,
  markSeries,
  driveType,
  mPos,
}) => {
  return (
    <div className="selected-filters-display">
      <h4>Selected Filters:</h4>
      {manufacturer && <p>Manufacturer: {manufacturer}</p>}
      {model && <p>Model: {model}</p>}
      {engineSize && <p>Engine Size: {engineSize}</p>}
      {markSeries && <p>Mark Series: {markSeries}</p>}
      {driveType && <p>Drive Type: {driveType}</p>}
      {mPos && <p>Position: {mPos}</p>}
    </div>
  );
};

export default SelectedFiltersDisplay;
