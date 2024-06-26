import { createContext } from "react";
import { MeetingListState } from "./state";
import { MeetingListTypes } from "./type";

export const MeetingListContext =
  createContext<MeetingListTypes | null>(null);

const MeetingListProvider = ({ children }: { children: React.ReactNode }) => {
  const { meetings, isLoading, DeleteMeeting } = MeetingListState();

  return (
    <MeetingListContext.Provider value={{ meetings, isLoading, DeleteMeeting }}>
      {children}
    </MeetingListContext.Provider>
  );
};

export default MeetingListProvider;
