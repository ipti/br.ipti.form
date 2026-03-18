import { useQuery } from "react-query";
import { requestUserLogs, UserLogsFilterType } from "./request";

export const useFetchRequestUserLogs = (filters: UserLogsFilterType) => {
  return useQuery(
    ["useFetchUserLogs", filters],
    () => requestUserLogs(filters),
    {
      keepPreviousData: true,
    }
  );
};
