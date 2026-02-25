import { CreateFouls, EditMeeting, EditMeetingUser } from "../Create/type";

export interface MeetingListRegisterTypes {
  meeting: Meeting | undefined;
  UpdateMeeting: (data: EditMeeting, id: number) => void
  CreateFouls: (data: CreateFouls) => void
  ArchivesMeeting: (data: any, id: number) => void
  isLoading: boolean
  DeleteArchiveMeeting: (id: number) => void
  UpdateMeetingUser: (data: EditMeetingUser) => void
}

export interface Meeting {
  workload: number
  id: number
  name: string
  meeting_date: string
  status: string
  description: any
  theme: string
  justification: any
  classroom_fk: number
  fouls: any[]
  classroom: Classroom
  meeting_user: MeetingUser[]
  meeting_archives: MeetingArc[]
}

export interface Classroom {
  name: string
  register_classroom: RegisterClassroom[]
  project: Project
}

export interface Project {
  project: Project
}

export interface Project {
  name: string
  id: number
  ruler_url: string
}


export interface RegisterClassroom {
  id: number
  registration_fk: number
  classroom_fk: number
  createdAt: string
  updatedAt: string
  registration: Registration
}

export interface Registration {
  id: number
  name: string
}


export interface MeetingUser {
  users: Users
}

export interface Users {
  id: number
  name: string
  username: string
  password: string
  active: boolean
  role: string
}

export interface MeetingArc {
  archive_url: string,
  id: number
  meeting_fk: number
  size: number
  original_name: string
  createdAt: string
  updatedAt: string
}
