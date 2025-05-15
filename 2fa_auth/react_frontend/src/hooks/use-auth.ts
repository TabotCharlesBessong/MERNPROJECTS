"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserSessionQueryFn } from "@/lib/api";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
    retry: 1,
  });
  return query;
};

export default useAuth;
