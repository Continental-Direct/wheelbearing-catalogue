import React from "react";

interface SearchButtonProps {
  onSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  const handleClick = () => {
    console.log("Search button clicked");
    onSearch(); // Always call onSearch
  };

  return (
    <button className="button" onClick={handleClick}>
      Search
    </button>
  );
};

export default SearchButton;

