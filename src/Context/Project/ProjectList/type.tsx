export interface ProjectListTypes {
  tsOne: Tsone | undefined,
  isLoading: boolean
}

export interface Tsone {
  id: number
  name: string
  avartar_url: any
  active: boolean
  createdAt: string
  updatedAt: string
  project: Project[]
}

export interface Project {
  id: number
  name: string
  active: boolean
  avartar_url: any
  social_technology_id: number
  createdAt: string
  updatedAt: string
}
