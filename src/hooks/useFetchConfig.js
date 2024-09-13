import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchConfig = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchConfig = async () => {
    try {
      const response = await axios.get("/configuration");
      setData(response.data.images.secure_base_url);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return { data, error };
};
