import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTable, useFilters, Column } from "react-table";
import ImageModal from "../modal/ImageModal";
import SelectColumnFilter from "./SelectColumnFilter";

declare module "react-table" {
  interface ColumnInstance<D extends object = {}> {
    canFilter?: boolean;
    Filter?: React.ComponentType<{ column: ColumnInstance<D> }>;
  }
}

interface RowData {
  PartNumber: string;
  [key: string]: any;
}

const SearchResultPage: React.FC = () => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentPartNumber, setCurrentPartNumber] = useState("");

  const columns: Column<RowData>[] = React.useMemo(
    () => [
      {
        Header: "Part Number",
        accessor: "CD",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Model Description",
        accessor: "ModelDesc",
        Filter: SelectColumnFilter,
      },
      { Header: "Years", accessor: "Years", Filter: SelectColumnFilter },
      { Header: "Fuel Type", accessor: "FuelType", Filter: SelectColumnFilter },
      {
        Header: "Transmission",
        accessor: "Transmission",
        Filter: SelectColumnFilter,
      },
      { Header: "Body Type", accessor: "BodyType", Filter: SelectColumnFilter },
      { Header: "Valve", accessor: "Valve", Filter: SelectColumnFilter },
      { Header: "Position", accessor: "MPos", Filter: SelectColumnFilter },
      {
        Header: "Drive Type",
        accessor: "TRWDansDRWDive",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Engine Code",
        accessor: "Engine Code",
        Filter: SelectColumnFilter,
      },
      {
        Header: "ABS",
        accessor: "abs_note",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Image",
        id: "image",
        accessor: "CD",
        Cell: ({ value }) => {
          const imageUrl = `https://dsucoxafocjydztfhxum.supabase.co/storage/v1/object/public/wheelbearing/Autocat%20Wheel%20Bearing%20Images%20(CDM)/${value}.jpg`;
          return (
            <img
              src={imageUrl}
              alt={value}
              style={{ width: 100, cursor: "pointer" }}
              onClick={() => {
                setCurrentImageUrl(imageUrl);
                setCurrentPartNumber(value);
                setModalOpen(true);
              }}
            />
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: searchResults,
    },
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="filtered-results">
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={currentImageUrl}
        PartNumber={currentPartNumber}
      />
      {searchResults.length > 0 ? (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>{column.Filter ? column.render("Filter") : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No results found, please try again.</div>
      )}
    </div>
  );
};

export default SearchResultPage;
