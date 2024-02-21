import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface MPosOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  selectedMarkSeries: string;
  selectedDriveType: string;
  reset: boolean;
  onMPosChange: (mpos: string) => void;
}

const FitmentOptions: React.FC<MPosOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  selectedMarkSeries,
  selectedDriveType,
  reset,
  onMPosChange,
}) => {
  const [mposOptions, setMposOptions] = useState<string[]>([]);
  const [selectedMPos, setSelectedMPos] = useState<string>("");

  const handleMPosChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMPos = event.target.value;
    setSelectedMPos(newMPos);
    onMPosChange(newMPos);
  };

  useEffect(() => {
    const fetchMPos = async () => {
      if (
        selectedModel &&
        selectedEngineSize &&
        selectedMarkSeries &&
        selectedDriveType
      ) {
        try {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("MPos")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize)
            .eq("mark_series", selectedMarkSeries)
            .eq("TRWDansDRWDive", selectedDriveType);
          if (error) {
            console.error("Error fetching MPos:", error.message);
          } else {
            const uniqueMPos = [...new Set(data.map((item: any) => item.MPos))];
            setMposOptions(uniqueMPos);
          }
        } catch (error: any) {
          console.error("Error:", error.message);
        }
      } else {
        setMposOptions([]);
      }
    };

    fetchMPos();
  }, [
    selectedModel,
    selectedEngineSize,
    selectedMarkSeries,
    selectedDriveType,
  ]);

  useEffect(() => {
    if (reset) {
      setMposOptions([]);
      setSelectedMPos("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedMPos}
          onChange={handleMPosChange}
        >
          <option value="">Front/Rear</option>
          {mposOptions.map((mpos, index) => (
            <option key={index} value={mpos}>
              {mpos}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FitmentOptions;
