import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";

const Explore = () => {
  const urlParams = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const totalPages = useRef(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`discover/${urlParams.explore}`, {
        params: {
          page: pageNumber,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
      totalPages.current = response.data.total_pages;
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    if (pageNumber >= totalPages.current) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [urlParams.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {urlParams.explore === "movie" ? "movies" : "TV Shows"}
        </h3>
        <div className="flex flex-wrap gap-6 justify-evenly">
          {data.map((item) => (
            <Card
              key={item.name || item.title}
              data={item}
              type={urlParams.explore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
