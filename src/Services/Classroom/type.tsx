export interface ReportClassroomType {
    id: number
    project_fk: number
    name: string
    year: number
    active: boolean
    createdAt: string
    updatedAt: string
    meeting: Meeting[]
    project: Project
    register_classroom: RegisterClassroom[]
  }
  
  export interface Meeting {
    id: number
    name: string
    meeting_date: string
    status: string
    description: any
    theme: string
    justification: any
    classroom_fk: number
    createdAt: string
    updatedAt: string
    fouls: Foul[]
  }
  
  export interface Foul {
    meeting_fk: number
    registration_fk: number
  }
  
  export interface Project {
    id: number
    name: string
    active: boolean
    approval_percentage: number
    avartar_url: any
    social_technology_id: number
    ruler_url: string
    createdAt: string
    updatedAt: string
    social_technology: SocialTechnology
  }
  
  export interface SocialTechnology {
    id: number
    name: string
    avartar_url: any
    active: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface RegisterClassroom {
    id: number
    registration_fk: number
    classroom_fk: number
    status: string
    createdAt: string
    updatedAt: string
    registration: Registration
  }
  
  export interface Registration {
    name: string
    id: number
  }
  