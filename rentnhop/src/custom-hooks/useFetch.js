import { useEffect, useState } from "react";

export const useFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {

        setError(err);
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, error };
};
