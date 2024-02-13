import React, { useState, useEffect } from "react";
import supabase from "../assets/supaBaseClient";

interface YearsOptionsProps {
  selectedModel: string;
  selectedEngineSize: string;
  selectedMarkSeries: string; // Added if Years depends on Mark/Series
  reset: boolean;
  onYearsChange: (year: string) => void;
}

const YearsOptions: React.FC<YearsOptionsProps> = ({
  selectedModel,
  selectedEngineSize,
  selectedMarkSeries, // Added if Years depends on Mark/Series
  reset,
  onYearsChange,
}) => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    onYearsChange(newYear);
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        if (
          selectedModel &&
          selectedEngineSize /* Add selectedMarkSeries if needed */
        ) {
          const { data, error } = await supabase
            .from("wheelbearing2")
            .select("Years") // Adjust column name as per your DB
            .eq("Model", selectedModel)
            .eq("EngineSize", selectedEngineSize);
          // .eq("mark_series", selectedMarkSeries) // Uncomment if Years depends on Mark/Series
          if (error) {
            console.error("Error fetching years:", error.message);
          } else {
            const uniqueYears = [
              ...new Set(data.map((item: any) => item.Years)),
            ];
            setYears(uniqueYears);
          }
        } else {
          setYears([]);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchYears();
  }, [selectedModel, selectedEngineSize, selectedMarkSeries]); 
  useEffect(() => {
    if (reset) {
      setYears([]);
      setSelectedYear("");
    }
  }, [reset]);

  return (
    <div className="filter-container">
      <div className="filter">
        <select
          className="dropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearsOptions;
