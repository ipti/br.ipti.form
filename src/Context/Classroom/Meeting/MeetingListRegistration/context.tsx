import { createContext } from "react";
import { MeetingListRegisterTypes } from "./type";
import { MeetingListRegistrationState } from "./state";

export const MeetingListRegistrationContext =
  createContext<MeetingListRegisterTypes | null>(null);

const MeetingListRegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    meeting,
    UpdateMeeting,
    CreateFouls,
    ArchivesMeeting,
    isLoading,
    DeleteArchiveMeeting,
  } = MeetingListRegistrationState();

  return (
    <MeetingListRegistrationContext.Provider
      value={{
        meeting,
        UpdateMeeting,
        CreateFouls,
        ArchivesMeeting,
        isLoading,
        DeleteArchiveMeeting,
      }}
    >
      {children}
    </MeetingListRegistrationContext.Provider>
  );
};

export default MeetingListRegistrationProvider;
