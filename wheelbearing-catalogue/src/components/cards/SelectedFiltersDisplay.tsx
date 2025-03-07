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
      <h4>Your Vehicle:</h4>
      {manufacturer && <p className="filter-tag">{manufacturer}</p>}
      {model && <p className="filter-tag"> {model}</p>}
      {engineSize && <p className="filter-tag"> {engineSize}</p>}
      {markSeries && <p className="filter-tag">{markSeries}</p>}
      {driveType && <p className="filter-tag"> {driveType}</p>}
      {mPos && <p className="filter-tag">{mPos}</p>}
    </div>
  );
};

export default SelectedFiltersDisplay;
