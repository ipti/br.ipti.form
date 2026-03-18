import { useQuery } from "react-query";
import http from "../axios";

export type UserLogScope = "classroom" | "meeting" | "project" | "social_technology";

type UserLogParams = {
  page: string;
  limit: string;
  user_fk: string;
  type?: string;
  action?: string;
} & Record<string, string>;

const scopeToParam: Record<UserLogScope, string> = {
  classroom: "classroom_fk",
  meeting: "meeting_fk",
  project: "project_fk",
  social_technology: "social_technology_fk",
};

export const useFetchUserLogs = (
  scope: UserLogScope,
  scopeId: string,
  params?: Omit<UserLogParams, "user_fk"> & { user_fk?: string }
) => {
  const fixedParams = {
    page: params?.page ?? "1",
    limit: params?.limit ?? "20",
    user_fk: params?.user_fk ?? "",
    type: params?.type ?? "",
    action: params?.action ?? "",
    [scopeToParam[scope]]: scopeId,
  };

  return useQuery({
    queryKey: ["user-logs", scope, scopeId, fixedParams],
    queryFn: async () => {
      const { data } = await http.get("/user-log-bff", { params: fixedParams });
      return data;
    },
    enabled: !!scopeId,
  });
};
