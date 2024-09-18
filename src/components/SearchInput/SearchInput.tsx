import { selectSearchInput, setSearchInput } from "../../store/movieSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ChangeEvent } from "react";

const SearchInput = ({ isHeader = false }) => {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector(selectSearchInput);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
