import { useState, useEffect } from "react";
import client from "../config/client";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUrl() {
    try {
      setLoading(true);
      const response = await client.get(url);
      const json = await response.data;
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchUrl();
  }, [url]);

  return { data, loading, error };
}
