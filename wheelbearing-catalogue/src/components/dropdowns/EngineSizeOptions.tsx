import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface EngineSizeOption {
  raw: string;
  formatted: string;
}

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
  const [engineSizes, setEngineSizes] = useState<EngineSizeOption[]>([]);
  const [selectedEngineSize, setSelectedEngineSize] = useState<string>("");

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
            .from("wheelbearing2")
            .select("EngineSize")
            .eq("Model", selectedModel);

          if (error) {
            console.error("Error fetching engine sizes:", error.message);
          } else {
            // Use a Map to ensure unique engine sizes based on the raw value.
            const uniqueEngineSizesMap = new Map<string, string>();
            data.forEach((item: any) => {
              const raw = item.EngineSize; // e.g. "2", "3"
              // Format for display (always one decimal)
              const formatted = Number(raw).toFixed(1); // e.g. "2.0", "3.0"
              if (!uniqueEngineSizesMap.has(raw)) {
                uniqueEngineSizesMap.set(raw, formatted);
              }
            });

            // Convert Map to array of objects.
            const engineSizesOptions: EngineSizeOption[] = Array.from(
              uniqueEngineSizesMap.entries()
            ).map(([raw, formatted]) => ({ raw, formatted }));

            // Sort options by numeric value of raw.
            engineSizesOptions.sort((a, b) => Number(a.raw) - Number(b.raw));

            setEngineSizes(engineSizesOptions);
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
          <option value="">Engine Size</option>
          {engineSizes.map((option) => (
            <option key={option.raw} value={option.raw}>
              {option.formatted}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EngineSizeOptions;
