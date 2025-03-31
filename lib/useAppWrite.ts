import { useEffect, useState } from "react";

export const useAppWrite = (fn: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);

    await fn()
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {
    data,
    loading,
    refetch
  };
};
