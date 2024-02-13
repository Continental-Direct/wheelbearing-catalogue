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
      <h3>Transmission</h3>
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
      <div>
        <input
          type="checkbox"
          name="Transmission"
          value="Semi-Automatic"
          onChange={handleCheckboxChange}
        />{" "}
        Semi-Automatic
      </div>
      {/* Filter by Fuel Type */}
      <h3>Fuel Type</h3>
      <div>
        <input
          type="checkbox"
          name="FuelType"
          value="Petrol"
          onChange={handleCheckboxChange}
        />{" "}
        Petrol
      </div>
      <div>
        <input
          type="checkbox"
          name="FuelType"
          value="Diesel"
          onChange={handleCheckboxChange}
        />{" "}
        Diesel
      </div>
      <div>
        <input
          type="checkbox"
          name="FuelType"
          value="Hybrid"
          onChange={handleCheckboxChange}
        />{" "}
        Hybrid
      </div>
      <div>
        <input
          type="checkbox"
          name="FuelType"
          value="Electric"
          onChange={handleCheckboxChange}
        />
        Electric
      </div>
      {/* Filter by Drive Type */}
      <h3>Drive Type</h3>
      <div>
        <input
          type="checkbox"
          name="TRWDansDRWDive"
          value="FWD"
          onChange={handleCheckboxChange}
        />{" "}
        Front Wheel Drive (FWD)
      </div>
      <div>
        <input
          type="checkbox"
          name="DriveType"
          value="RWD"
          onChange={handleCheckboxChange}
        />{" "}
        Rear Wheel Drive (RWD)
      </div>

      {/* Filter by Body Type */}
      <h3>Body Type</h3>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Hatch"
          onChange={handleCheckboxChange}
        />{" "}
        Hatch
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="SUV"
          onChange={handleCheckboxChange}
        />{" "}
        SUV
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Estate"
          onChange={handleCheckboxChange}
        />
        Estate
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="ATV"
          onChange={handleCheckboxChange}
        />{" "}
        ATV
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Saloon"
          onChange={handleCheckboxChange}
        />{" "}
        Saloon
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Saloon"
          onChange={handleCheckboxChange}
        />{" "}
        Coupe
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Cabrio"
          onChange={handleCheckboxChange}
        />{" "}
        Cabrio
      </div>
      <div>
        <input
          type="checkbox"
          name="BodyType"
          value="Van"
          onChange={handleCheckboxChange}
        />
        Van
      </div>
      {/* Add more filters as needed */}
    </div>
  );
};

export default FilterSection;
