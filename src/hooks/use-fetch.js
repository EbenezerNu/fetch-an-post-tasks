import { useState } from "react";
const useFetch = (props, dataHandler) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(props.url, {
        method: props.method ? props.method : "GET",
        body: props.body ? JSON.stringify(props.body) : null,
        headers: props.headers ? props.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      dataHandler(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
