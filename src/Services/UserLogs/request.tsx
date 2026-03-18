import http from "../axios";
import { logout } from "../localstorage";

export interface UserLogsFilterType {
  page: number;
  limit: number;
  user_fk?: string;
  type?: string;
  project_fk?: string;
  classroom_fk?: string;
  meeting_fk?: string;
  social_technology_fk?: string;
  action?: string;
}

export const requestUserLogs = (filters: UserLogsFilterType) => {
  const params = new URLSearchParams();
  
  params.append("page", filters.page.toString());
  params.append("limit", filters.limit.toString());
  
  if (filters.user_fk) params.append("user_fk", filters.user_fk);
  if (filters.type) params.append("type", filters.type);
  if (filters.project_fk) params.append("project_fk", filters.project_fk);
  if (filters.classroom_fk) params.append("classroom_fk", filters.classroom_fk);
  if (filters.meeting_fk) params.append("meeting_fk", filters.meeting_fk);
  if (filters.social_technology_fk) params.append("social_technology_fk", filters.social_technology_fk);
  if (filters.action) params.append("action", filters.action);

  const path = `/user-log-bff?${params.toString()}`;
  
  return http
    .get(path)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};
