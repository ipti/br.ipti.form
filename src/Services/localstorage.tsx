const TOKEN_KEY = "token";
const id_key = "user-id";

const id_project = "id-project";

const id_ts = "id-ts";
const projects = "projects";

const menu_key = "menu";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export const setYear = (id: string) => {
  localStorage.setItem("year-selection", id);
};

export const getYear = () => localStorage.getItem("year-selection");

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(id_key);
  localStorage.removeItem(id_project);
  localStorage.removeItem(id_ts);


  // localStorage.clear();
};

export const idUser = (id: string) => {
  localStorage.setItem(id_key, id);
};

export const idProject = (id: string) => {
  localStorage.setItem(id_project, id);
};

export const idTs = (id: string) => {
  localStorage.setItem(id_ts, id);
};

export const ProjectLogin = (data: any) => {
  localStorage.setItem(projects, data);
};

export const GetProjects = () => {
  return localStorage.getItem(projects);
};
export const GetIdProject = () => {
  return localStorage.getItem(id_project);
};

export const GetIdTs = () => {
  return localStorage.getItem(id_ts);
};

export const GetIdUser = () => {
  return localStorage.getItem(id_key);
};
export const menuItem = (id: string) => {
  localStorage.setItem(menu_key, id);
};

export const getMenuItem = () => {
  return localStorage.getItem(menu_key);
};
