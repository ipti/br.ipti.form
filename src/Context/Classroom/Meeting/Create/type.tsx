export interface CreateMeeting {
  name: string;
  theme?: string;
  meeting_date?: Date;
  users?: Array<number>;
  classroom?: number;
  workload?: string;
}

export interface EditMeeting {
  name?: string;
  description?: string;
  status?: { id: string; name: string };
  meeting_date?: Date;
}

export interface EditMeetingUser {
  users: number[]
  id: number
}


export interface CreateFouls {
  meeting: number;
  registration?: Array<number>;
}

export interface CreateMeetingType {
  CreateMeeting: (data: CreateMeeting) => void;
}
