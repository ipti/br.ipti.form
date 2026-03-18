import { createContext } from "react";
import { EditTsState } from "./state";
import { EditTsTypes } from "./type";

export const EditTsContext = createContext<EditTsTypes | null>(null);

const EditTsProvider = ({ children }: { children: React.ReactNode }) => {
  const { EditTechnology, loading } = EditTsState();

  return (
    <EditTsContext.Provider value={{ EditTechnology, loading }}>
      {children}
    </EditTsContext.Provider>
  );
};

export default EditTsProvider;
