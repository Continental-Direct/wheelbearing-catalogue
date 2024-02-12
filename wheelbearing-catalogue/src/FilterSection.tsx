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
      {/* Example filters */}
      <div>
        <input
          type="checkbox"
          name="Manuf"
          value="Toyota"
          onChange={handleCheckboxChange}
        />{" "}
        Toyota
      </div>
      <div>
        <input
          type="checkbox"
          name="Manuf"
          value="Ford"
          onChange={handleCheckboxChange}
        />{" "}
        Ford
      </div>
      {/* Repeat for other filters */}
    </div>
  );
};

export default FilterSection;
