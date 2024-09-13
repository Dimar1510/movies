import { useLocation } from "react-router-dom";
import Card from "../components/Card/Card";
import SearchInput from "../components/SearchInput/SearchInput";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import { useFetchSearch } from "../hooks/useFetchSearch";

const Heading = ({ children }) => {
  return (
    <h3 className="text-lg lg:text-xl font-semibold my-3 px-4">{children}</h3>
  );
};

const Search = () => {
  const location = useLocation();
  const { data, loading } = useFetchSearch();

  return (
    <div className="pt-16 pb-8">
      <div className="container mx-auto">
        <ScrollTop />
        <div className="lg:hidden m-4 border-white border p-1 rounded">
          <SearchInput />
        </div>
        {!data && (
          <Heading>Start typing to search for movies or TV shows...</Heading>
        )}
        {data && (
          <>
            <Heading>
              {data.length > 0 && !loading ? (
                <>
                  Search results shown:{" "}
                  <span className="italic font-light">
                    {decodeURIComponent(location?.search)
                      .slice(3)
                      .split("%20")
                      .join(" ")}
                  </span>
                </>
              ) : loading ? (
                "Loading..."
              ) : (
                "No search results"
              )}
            </Heading>
            <div className="flex flex-wrap gap-6 justify-evenly">
              {data.map(
                (item) =>
                  (item.media_type === "tv" || item.media_type === "movie") && (
                    <Card key={item.id} data={item} type={item.media_type} />
                  )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
