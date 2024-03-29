import { createContext } from "react";
import { ScheduleTypes } from "./type";
import { ScheduleState } from "./state";
import { ScheduleListState } from "./ListSchedule/state";

export const ScheduleContext = createContext<ScheduleTypes | null>(null);

const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {

    const { CreateSchedule, initialValue, DeleteSchedule, UpdateSchedule } = ScheduleState();

    const { scheduleList } = ScheduleListState();

    return (
        <ScheduleContext.Provider value={{ CreateSchedule, initialValue, scheduleList, DeleteSchedule, UpdateSchedule }}>
            {children}
        </ScheduleContext.Provider>
    )
}

export default ScheduleProvider;