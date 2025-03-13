import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface TransmissionOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  selectedBodyType: string;
  reset: boolean;
  onTransmissionChange: (transmission: string) => void;
}

const TransmissionOptions: React.FC<TransmissionOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  selectedBodyType,
  reset,
  onTransmissionChange,
}) => {
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");

  // Fetch Transmissions whenever Model, Engine Size, and Body Type change
  useEffect(() => {
    const fetchTransmissions = async () => {
      try {
        if (selectedModel && selectedEngineSize && selectedBodyType) {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("Transmission")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize)
            .eq("BodyType", selectedBodyType);

          if (error) {
            console.error("Error fetching transmissions:", error.message);
          } else {
            // Collect unique transmissions
            const uniqueTransmissions = [
              ...new Set(data.map((item: any) => item.Transmission)),
            ];
            setTransmissions(uniqueTransmissions);
          }
        } else {
          setTransmissions([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchTransmissions();
  }, [selectedModel, selectedEngineSize, selectedBodyType]);

  // Reset dropdown when parent resets
  useEffect(() => {
    if (reset) {
      setTransmissions([]);
      setSelectedTransmission("");
    }
  }, [reset]);

  const handleTransmissionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newTransmission = event.target.value;
    setSelectedTransmission(newTransmission);
    onTransmissionChange(newTransmission); // Notify parent
  };

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedTransmission}
          onChange={handleTransmissionChange}
        >
          <option value="">Transmission</option>
          {transmissions.map((trans) => (
            <option key={trans} value={trans}>
              {trans}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TransmissionOptions;
