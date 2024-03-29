import { createContext } from "react";
import { RegistrationClassroomState } from "./state";
import { RegistrationDetailsTypes } from "./type";

export const RegistrationDetailsContext =
  createContext<RegistrationDetailsTypes | null>(null);

const RegistartionDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { registration, initialValue, typesex, color, handleUpdateRegistration } =
    RegistrationClassroomState();

  return (
    <RegistrationDetailsContext.Provider
      value={{ registration, initialValue, typesex, color, handleUpdateRegistration }}
    >
      {children}
    </RegistrationDetailsContext.Provider>
  );
};

export default RegistartionDetailsProvider;
