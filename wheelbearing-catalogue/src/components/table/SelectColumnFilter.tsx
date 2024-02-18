import React, { ReactNode } from "react";

interface SelectColumnFilterProps {
  column: {
    filterValue: any;
    setFilter: (value: any) => void;
    preFilteredRows: Array<{ values: Record<string, any> }>;
    id: string;
  };
}

const SelectColumnFilter: React.FC<SelectColumnFilterProps> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option as string}>
          {option as ReactNode}
        </option>
      ))}
    </select>
  );
};

export default SelectColumnFilter;
