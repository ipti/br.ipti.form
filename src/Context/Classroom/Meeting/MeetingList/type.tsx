export interface MeetingListTypes {
  meetings: Meeting[] | undefined;
  isLoading: boolean
  DeleteMeeting: (id: number) => void
}

export interface Meeting {
  id: number
  name: string
  meeting_date: string
  status: string
  user_fk: number
  classroom_fk: number
  reaproveitado: boolean
}
