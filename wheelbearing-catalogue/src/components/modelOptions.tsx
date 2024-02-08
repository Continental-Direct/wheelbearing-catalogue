import React, { useState, useEffect } from "react";
import supabase from "../assets/supaBaseClient";

interface ModelOptionsProps {
  selectedManufacturer: string;
  reset: boolean;
  onModelChange: (model: string) => void;
}

const ModelOptions: React.FC<ModelOptionsProps> = ({
  selectedManufacturer,
  reset,
  onModelChange,
}) => {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value;
    setSelectedModel(newModel);
    onModelChange(newModel);
  };

  useEffect(() => {
    console.log("Selected Manufacturer:", selectedManufacturer);
    const fetchModels = async () => {
      try {
        if (selectedManufacturer) {
          const { data, error } = await supabase
            .from("Wheelbearing")
            .select("Model")
            .eq("Manuf", selectedManufacturer);

          if (error) {
            console.error("Error fetching models:", error.message);
            return;
          }
          console.log("Data returned from Supabase:", data);
          const uniqueModels = [
            ...new Set(data.map((item: any) => item.Model)),
          ];
          setModels(uniqueModels);
        } else {
          setModels([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchModels();
  }, [selectedManufacturer]);

  useEffect(() => {
    if (reset) {
      setModels([]);
      setSelectedModel("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ModelOptions;
