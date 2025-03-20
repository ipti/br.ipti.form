import BeneficiariesListProvider from "../../../Context/Beneficiaries/BeneficiariesList/context";
import { BeneficiariesListPage } from "./page";

const BeneficiariesList = () => {
  return (
    <BeneficiariesListProvider>
      <BeneficiariesListPage />
    </BeneficiariesListProvider>
  );
};

export default BeneficiariesList;
