import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import debounce from "lodash/debounce";
import Spinner from "../components/Spinner/Spinner";
import ScrollTop from "../components/ScrollTop/ScrollTop";
import { useFetchExplore } from "../hooks/useFetchExplore";
const Explore = () => {
  const urlParams = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const totalPages = useRef(0);

  // Reset when the category changes
  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [urlParams.explore]);

  const {
    data: exploreData,
    loading,
    error,
    totalPages: getTotalPages,
  } = useFetchExplore(`discover/${urlParams.explore}`, pageNumber);

  useEffect(() => {
    if (!exploreData) return;
    setData((prev) => {
      const newData = exploreData.filter(
        (newItem) =>
          !prev.some((existingItem) => existingItem.id === newItem.id)
      );
      return [...prev, ...newData];
    });
    totalPages.current = getTotalPages;
  }, [exploreData]);

  const handleScroll = useCallback(
    debounce(() => {
      if (pageNumber >= totalPages.current || loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPageNumber((prev) => prev + 1);
      }
    }, 200),
    [pageNumber, totalPages.current]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error)
    return (
      <div className="pt-16">
        Error loading data, something went wrong with API. Please try again
        later.
      </div>
    );

  if (exploreData)
    return (
      <div className="pt-16 pb-8">
        <ScrollTop />
        <div className="container mx-auto">
          <h3 className="capitalize px-3 text-lg lg:text-xl font-semibold my-3">
            Popular {urlParams.explore === "movie" ? "movies" : "TV Shows"}
          </h3>
          <div className="flex flex-wrap gap-6 justify-evenly">
            {data.map((item) => (
              <Card key={item.id} data={item} type={urlParams.explore} />
            ))}
          </div>
          {loading && (
            <div className="flex justify-center fixed z-50 m-auto size-fit top-0 bottom-0 left-0 right-0 scale-150">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    );
};

export default Explore;
