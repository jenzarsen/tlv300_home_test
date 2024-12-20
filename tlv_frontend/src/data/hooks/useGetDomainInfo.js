import { getDomainInfo } from "services/domainInfo";
import { useEffect, useState, useCallback } from "react";

export const useGetDomainInfo = (domainName, type) => {
  const [state, setState] = useState({
    info: {},
    isLoading: false,
    error: null,
  });

  const getInfo = useCallback(async () => {
    if (!domainName) return;

    //Set Loading State
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await getDomainInfo(domainName, type);
        console.log(result);
      //Set Data from result
      setState({
        info: result?.data || {},
        isLoading: false,
        error: null,
      });
    } catch (error) {
      //Set Error in case there's an issue
      setState({
        info: {},
        isLoading: false,
        error: error?.response?.data?.message || "Failed to fetch domain data.",
      });
    }
  }, [domainName, type]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return { ...state };
};
