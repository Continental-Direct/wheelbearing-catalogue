import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface BodyTypeOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  reset: boolean;
  onBodyTypeChange: (bodyType: string) => void;
}

const BodyTypeOptions: React.FC<BodyTypeOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  reset,
  onBodyTypeChange,
}) => {
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");

  // Fetch Body Types whenever Model & Engine Size change
  useEffect(() => {
    const fetchBodyTypes = async () => {
      try {
        if (selectedModel && selectedEngineSize) {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("BodyType")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize);

          if (error) {
            console.error("Error fetching body types:", error.message);
          } else {
            // Collect unique body types
            const uniqueBodyTypes = [
              ...new Set(data.map((item: any) => item.BodyType)),
            ];
            setBodyTypes(uniqueBodyTypes);
          }
        } else {
          setBodyTypes([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchBodyTypes();
  }, [selectedModel, selectedEngineSize]);

  // Reset dropdown when parent resets
  useEffect(() => {
    if (reset) {
      setBodyTypes([]);
      setSelectedBodyType("");
    }
  }, [reset]);

  const handleBodyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newBodyType = event.target.value;
    setSelectedBodyType(newBodyType);
    onBodyTypeChange(newBodyType); // Notify parent
  };

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedBodyType}
          onChange={handleBodyTypeChange}
        >
          <option value="">Body Type</option>
          {bodyTypes.map((bt) => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BodyTypeOptions;
