import React from "react";

interface SearchButtonProps {
  onSearch: () => void;
  disabled: boolean; // New prop to control button state
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch, disabled }) => {
  return (
    <button className="button" onClick={onSearch} disabled={disabled}>
      Search
    </button>
  );
};

export default SearchButton;
