import React from "react";

interface FilterSectionProps {
  onFilterChange: (name: string, value: string, checked: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    onFilterChange(name, value, checked);
  };

  return (
    <div className="filter-section">
      <h2>Filters</h2>
      {/* Filter by Transmission */}
      <div>
        <input
          type="checkbox"
          name="Transmission"
          value="Automatic"
          onChange={handleCheckboxChange}
        />{" "}
        Automatic
      </div>
      <div>
        <input
          type="checkbox"
          name="Transmission"
          value="Manual"
          onChange={handleCheckboxChange}
        />{" "}
        Manual
      </div>
      {/* Add more transmission types as needed */}
    </div>
  );
};

export default FilterSection;
