import React, { useState, useEffect } from "react";
import supabase from "../assets/supaBaseClient";

interface EngineSizeOptionsProps {
  selectedModel: string;
  reset: boolean;
  onEngineSizeChange: (engineSize: string) => void;
}

const EngineSizeOptions: React.FC<EngineSizeOptionsProps> = ({
  selectedModel,
  reset,
  onEngineSizeChange,
}) => {
  const [engineSizes, setEngineSizes] = useState<string[]>([]);
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");
  console.log("Received model:", selectedModel);

  const handleEngineSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedEngineSize(value);
    onEngineSizeChange(value);
  };

  useEffect(() => {
    const fetchEngineSizes = async () => {
      try {
        if (selectedModel) {
          const { data, error } = await supabase
            .from("wheelbearing")
            .select("EngineSize")
            .eq("Model", selectedModel);
          if (error) {
            console.error("Error fetching engine sizes:", error.message);
          } else {
            const uniqueEngineSizes = [
              ...new Set(data.map((item: any) => item.EngineSize)),
            ];
            uniqueEngineSizes.sort((a, b) => Number(a) - Number(b));

            setEngineSizes(uniqueEngineSizes);
          }
        } else {
          setEngineSizes([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchEngineSizes();
  }, [selectedModel]);

  useEffect(() => {
    if (reset) {
      setEngineSizes([]);
      setSelectedEngineSize("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedEngineSize}
          onChange={handleEngineSizeChange}
        >
          <option value="">Select Engine Size</option>
          {engineSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EngineSizeOptions;
