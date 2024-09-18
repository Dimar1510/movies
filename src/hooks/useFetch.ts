import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ICardItem } from "../store/types";

export const useFetch = (endpoint: string) => {
  const [data, setData] = useState<ICardItem | ICardItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint);
      if (response) {
        setData(response.data.results || response.data);
        setError(null);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message + ". " + error.response?.data.status_message);
        console.log(error);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
