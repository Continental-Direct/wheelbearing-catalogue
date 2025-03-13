import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface DriveTypeOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  selectedBodyType: string; // Make sure this exists
  selectedTransmission: string; // And this, too
  selectedMarkSeries: string;
  reset: boolean;
  onDriveTypeChange: (driveType: string) => void;
}

const DriveTypeOptions: React.FC<DriveTypeOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  selectedMarkSeries,
  reset,
  onDriveTypeChange,
}) => {
  const [driveTypes, setDriveTypes] = useState<string[]>([]);
  const [selectedDriveType, setSelectedDriveType] = useState<string>("");

  const handleDriveTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDriveType = event.target.value;
    setSelectedDriveType(newDriveType);
    onDriveTypeChange(newDriveType);
  };

  useEffect(() => {
    const fetchDriveTypes = async () => {
      try {
        if (selectedModel && selectedEngineSize && selectedMarkSeries) {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("TRWDansDRWDive")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize)
            .eq("mark_series", selectedMarkSeries);
          if (error) {
            console.error("Error fetching drive types:", error.message);
          } else {
            const uniqueDriveTypes = [
              ...new Set(data.map((item: any) => item.TRWDansDRWDive)),
            ];
            setDriveTypes(uniqueDriveTypes);
          }
        } else {
          setDriveTypes([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchDriveTypes();
  }, [selectedModel, selectedEngineSize, selectedMarkSeries]);

  useEffect(() => {
    if (reset) {
      setDriveTypes([]);
      setSelectedDriveType("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedDriveType}
          onChange={handleDriveTypeChange}
        >
          <option value="">Drive Type</option>
          {driveTypes.map((driveType, index) => (
            <option key={index} value={driveType}>
              {driveType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DriveTypeOptions;
