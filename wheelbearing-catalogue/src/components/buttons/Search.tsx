interface SearchButtonProps {
  onSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <button className="button" onClick={onSearch}>
      Search
    </button>
  );
};

export default SearchButton;
