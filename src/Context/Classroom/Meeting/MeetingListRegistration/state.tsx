import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchRequestMeetingOne } from "../../../../Services/Meeting/query";
import { Meeting } from "./type";
import { CreateFouls, EditMeeting } from "../Create/type";
import { MeetingController } from "../../../../Services/Meeting/controller";
export const MeetingListRegistrationState = () => {

  const { idMeeting } = useParams();

  const { data: meetingRequest, isLoading } = useFetchRequestMeetingOne(idMeeting!);
  const [meeting, setmeeting] = useState<Meeting | undefined>();

  const { requestUpdateMeetingMutation, requestDeleteArchivesMeetingMutation,requestCreateFoulsMutation, requestArchvesMeetingMutation } = MeetingController()

  const UpdateMeeting = (data: EditMeeting, id: number) => {
    requestUpdateMeetingMutation.mutate({data: data, id: id})
  }

  const DeleteArchiveMeeting = (id: number) => {
    requestDeleteArchivesMeetingMutation.mutate(id)
  }

  const ArchivesMeeting = (data: any, id: number) => {
    const formData = new FormData();
    formData.append('file', data);
    requestArchvesMeetingMutation.mutate({data: formData, id: id})
  }

  const CreateFouls = (data: CreateFouls) => {
    requestCreateFoulsMutation.mutate(data)
  }

  useEffect(() => {
    if (meetingRequest) {
      setmeeting(meetingRequest);
    }
  }, [meetingRequest]);

  return { meeting, UpdateMeeting, CreateFouls, ArchivesMeeting, isLoading, DeleteArchiveMeeting };
};
