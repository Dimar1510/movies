import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchConfig = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchConfig = async () => {
    try {
      const response = await axios.get("/configuration");
      setData(response.data.images.secure_base_url);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return { data, error };
};
