import { useQuery } from "@tanstack/react-query";
import { getConsents } from "../services/consents";

export const fetchConsentsKey = ["fetch-consents"];

export const useFetchConsentsData = () => {
  return useQuery({
    queryKey: [fetchConsentsKey],
    queryFn: async () => {
      return await getConsents();
    },
  });
};
