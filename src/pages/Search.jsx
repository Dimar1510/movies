import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { useSelector } from "react-redux";
import { selectSearchInput } from "../store/movieSlice";
import SearchInput from "../components/SearchInput/SearchInput";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useSelector(selectSearchInput);

  const fetchSearchData = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`/search/multi`, {
        params: {
          query,
        },
      });
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      setLoading(false);
      const delayedClear = setTimeout(() => {
        navigate("/search");
        setData([]);
      }, 750);
      return () => clearTimeout(delayedClear);
    } else {
      setLoading(true);
      const delayedFetch = setTimeout(() => {
        fetchSearchData(location.search.slice(3));
      }, 750);
      return () => clearTimeout(delayedFetch);
    }
  }, [location.search, searchInput]);

  return (
    <div className="pt-16 pb-8">
      <div className="container mx-auto">
        <div className="lg:hidden m-4 border-white border p-1 rounded">
          <SearchInput />
        </div>
        <h3 className="text-lg lg:text-xl font-semibold my-3 px-4">
          {!loading && searchInput.length > 0 && data.length === 0 ? (
            "No search results"
          ) : loading ? (
            "Loading..."
          ) : data.length > 0 ? (
            <>
              Search results shown:{" "}
              <span className="italic font-light">
                {decodeURIComponent(location?.search)
                  .slice(3)
                  .split("%20")
                  .join(" ")}
              </span>
            </>
          ) : (
            "Start typing to search for movies or TV shows..."
          )}
        </h3>
        <div className="flex flex-wrap gap-6 justify-evenly">
          {data.map(
            (item) =>
              (item.media_type === "tv" || item.media_type === "movie") && (
                <Card key={item.id} data={item} type={item.media_type} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
