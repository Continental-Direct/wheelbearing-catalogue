import React, { useState, useEffect } from "react";
import supabase from "../../assets/supaBaseClient";

interface MarkSeriesOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  reset: boolean;
  onMarkSeriesChange: (markSeries: string) => void;
}

const MarkSeriesOptions: React.FC<MarkSeriesOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  reset,
  onMarkSeriesChange,
}) => {
  const [markSeries, setMarkSeries] = useState<string[]>([]);
  const [selectedMarkSeries, setSelectedMarkSeries] = useState<string>("");

  const handleMarkSeriesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMarkSeries = event.target.value;
    setSelectedMarkSeries(newMarkSeries);
    onMarkSeriesChange(newMarkSeries);
  };

  useEffect(() => {
    const fetchMarkSeries = async () => {
      try {
        if (selectedModel && selectedEngineSize) {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("mark_series")
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize);

          if (error) {
            console.error("Error fetching mark/series:", error.message);
          } else {
            const uniqueMarkSeries = [
              ...new Set(data.map((item: any) => item.mark_series)),
            ];
            setMarkSeries(uniqueMarkSeries);
          }
        } else {
          setMarkSeries([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchMarkSeries();
  }, [selectedModel, selectedEngineSize]);

  useEffect(() => {
    if (reset) {
      setMarkSeries([]);
      setSelectedMarkSeries("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedMarkSeries}
          onChange={handleMarkSeriesChange}
        >
          <option value=""> Mark/Series</option>
          {markSeries.map((ms, index) => (
            <option key={index} value={ms}>
              {ms}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MarkSeriesOptions;
