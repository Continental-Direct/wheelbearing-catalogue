import React, { useState, useEffect } from "react";
import supabase from "../assets/supaBaseClient";

interface MPosOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  selectedMarkSeries: string;
  selectedYear: string;
  reset: boolean;
  onMPosChange: (mpos: string) => void;
}

const FitmentOptions: React.FC<MPosOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  selectedMarkSeries,
  selectedYear,
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
        selectedYear
      ) {
        try {
          const { data, error } = await supabase
            .from("wheelbearing")
            .select("MPos")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize)
            .eq("mark_series", selectedMarkSeries)
            .eq("Years", selectedYear);
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
  }, [selectedModel, selectedEngineSize, selectedMarkSeries, selectedYear]);

  useEffect(() => {
    if (reset) {
      setMposOptions([]);
      setSelectedMPos("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <select
        className="dropdown"
        value={selectedMPos}
        onChange={handleMPosChange}
      >
        <option value="">Select MPos</option>
        {mposOptions.map((mpos, index) => (
          <option key={index} value={mpos}>
            {mpos}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FitmentOptions;
