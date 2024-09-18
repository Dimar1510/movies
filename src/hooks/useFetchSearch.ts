import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ICardItem } from "../store/types";

export const useFetchSearch = () => {
  const [data, setData] = useState<ICardItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchSearchData = async (query: string) => {
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
    if (!location.search) {
      setData(null);
      return;
    }
    setLoading(true);
    fetchSearchData(location.search.slice(3));
  }, [location.search]);

  return { data, loading };
};
