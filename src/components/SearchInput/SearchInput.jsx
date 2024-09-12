import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setSearchInput } from "../../store/movieSlice";

const SearchInput = ({ isHeader = false }) => {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const handleInputChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent px-1 outline-none border-none w-full"
      onChange={handleInputChange}
      value={searchInput}
      id={isHeader ? "search-input" : ""}
    />
  );
};

export default SearchInput;
