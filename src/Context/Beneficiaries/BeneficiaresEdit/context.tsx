import { createContext } from "react";
import { BeneficiariesEditState } from "./state";
import { BeneficiariesEditType } from "./type";

export const BeneficiariesEditContext =
  createContext<BeneficiariesEditType | null>(null);

const BeneficiariesEditProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    registrations,
    initialValue,
    isLoading,
    CreateRegisterClassroom,
    DeleteRegistration,
    handleUpdateRegistration,
    classrooms,
    project,
    projectRequet,
    setProject,
    file, 
    setFile,
    CreateRegisterTerm,
    DeleteRegisterTerm,
    UpdateRegisterTerm

  } = BeneficiariesEditState();

  return (
    <BeneficiariesEditContext.Provider
      value={{
        file,
        setFile,
        registrations,
        initialValue,
        isLoading,
        CreateRegisterClassroom,
        DeleteRegistration,
        handleUpdateRegistration,
        classrooms,
        project,
        projectRequet,
        setProject,
        CreateRegisterTerm,
        DeleteRegisterTerm,
        UpdateRegisterTerm
      }}
    >
      {children}
    </BeneficiariesEditContext.Provider>
  );
};

export default BeneficiariesEditProvider;
