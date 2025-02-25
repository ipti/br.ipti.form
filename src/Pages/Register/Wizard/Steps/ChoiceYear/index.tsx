import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import homeImg from "../../../../../Assets/images/Capelo.png";
import DropdownComponent from "../../../../../Components/Dropdown";
import { RegisterContext } from "../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../Context/Register/type";
import { Column, Padding, Row } from "../../../../../Styles/styles";
import ImageTextSteps from "../../ImageTextStpes";
import { getYear, setYear } from "../../../../../Services/localstorage";
import queryClient from "../../../../../Services/reactquery";
// import { RegistrationContext } from "../../containers/Registration/Context/context";

const ChoiceYear = () => {
  const [year, setYearPage] = useState<number | undefined>();

  useEffect(() => {
    setYearPage(parseInt(getYear()!));
  }, []);

  const props = useContext(RegisterContext) as RegisterTypes;

  const years = [
    { value: 2025 },
    { value: 2024 },
    { value: 2023 },
    { value: 2022 },
    { value: 2021 },
  ];

  return (
    <>
      <Column className="contentChoiceYear" id="center">
        <ImageTextSteps
          img={homeImg}
          title="Matrícula Online"
          subTitle={
            <p style={{ textAlign: "center" }}>
              Bem-vindo ao Matrícula online, para <br /> iniciar escolha o ano e
              clique no botão abaixo
            </p>
          }
        />
        <Row id="center">
          <div className="col-12 md:col-4">
            <DropdownComponent
              placerholder="Escolha o Ano"
              onChange={(e) => {
                setYearPage(e.target.value);
                setYear(e.target.value);
                queryClient.refetchQueries("useRequestProjectsAndClassroom");
              }}
              options={years}
              optionsLabel="value"
              value={year}
            />
          </div>
        </Row>
        <Padding padding={props.padding} />
        <Row id="center" className={"marginTop marginButtom"}>
          <div className="col-4">
            <Button
              type="button"
              onClick={() => {
                props.NextStep({});
              }}
              className="t-button-primary"
              label="Iniciar"
              // disabled={!isValid}
            />
          </div>
        </Row>
      </Column>
    </>
  );
};

export default ChoiceYear;
