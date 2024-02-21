import { useState, useEffect, FC } from "react";

import manufacturers from "../../../manufacturers.js/manufacturers";

interface ManufacturerOptionsProps {
  onManufacturerChange: (value: string) => void;
  reset: boolean;
}

const ManufacturerOptions: FC<ManufacturerOptionsProps> = ({
  onManufacturerChange,
  reset,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");

  const handleManufacturerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedManufacturer(value);
    onManufacturerChange(value);
  };

  useEffect(() => {
    if (reset) {
      setSelectedManufacturer("");
    }
  }, [reset]);

  const manufacturerOptions = manufacturers.map((manuf) => (
    <option key={manuf} value={manuf}>
      {manuf}
    </option>
  ));

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          value={selectedManufacturer}
          onChange={handleManufacturerChange}
        >
          <option value="" disabled>
            Manufacturer
          </option>
          {manufacturerOptions}
        </select>
      </div>
    </div>
  );
};

export default ManufacturerOptions;
