import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ICardItem } from "../store/types";

export const useFetchExplore = (category: string, pageNumber: number) => {
  const [data, setData] = useState<ICardItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const visitedRef = useRef(false);

  const fetchData = async (endpoint: string) => {
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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        throw error;
      }
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
