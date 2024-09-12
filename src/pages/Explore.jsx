import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import debounce from "lodash/debounce";
import Spinner from "../components/Spinner/Spinner";
import ScrollTop from "../components/ScrollTop/ScrollTop";
const Explore = () => {
  const urlParams = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalPages = useRef(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`discover/${urlParams.explore}`, {
        params: {
          page: pageNumber,
        },
      });
      setData((prev) => {
        const newData = response.data.results.filter(
          (newItem) =>
            !prev.some((existingItem) => existingItem.id === newItem.id)
        );
        return [...prev, ...newData];
      });
      totalPages.current = response.data.total_pages;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = debounce(() => {
    if (pageNumber >= totalPages.current) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setPageNumber((prev) => prev + 1);
    }
  }, 200);

  useEffect(() => {
    fetchData();
  }, [pageNumber, urlParams.explore]);

  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [urlParams.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
