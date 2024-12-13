import { UpdateProject } from "../CreateList/type";

export interface ProjectOneTypes {
  project: ApiProject | undefined;
  isLoading: boolean;
  updateProject: (data: UpdateProject, id: number) => void;
  rulerProject: (file: File, id: number) => void
  deleteProject: (id: number) => void
}

export interface ApiProject {
  project: Project
  register_count: number
}

export interface Project {
  id: number
  name: string
  active: boolean
  approval_percentage: number
  avartar_url: any
  ruler_url: string
  social_technology_id: number
  createdAt: string
  updatedAt: string
  classrooms: Classroom[]
}

export interface Classroom {
  id: number
  project_fk: number
  name: string
  year: number
  active: boolean
  createdAt: string
  updatedAt: string
  _count: Count
}

export interface Count {
  meeting: number
  register_classroom: number
}
