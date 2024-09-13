import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useFetchExplore = (category, pageNumber) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const visitedRef = useRef(false);

  const fetchData = async (endpoint) => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, {
        params: { page: pageNumber },
      });
      if (response) {
        setData(response.data.results || response.data);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // handle category switch
  useEffect(() => {
    fetchData(category);
  }, [pageNumber]);

  //handle initial fetch or page switch
  useEffect(() => {
    if (pageNumber === 1 && visitedRef.current) {
      fetchData(category);
    } else {
      visitedRef.current = true;
    }
  }, [category]);

  return { data, loading, error, totalPages };
};
