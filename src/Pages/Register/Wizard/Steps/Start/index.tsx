import { Button } from "primereact/button";
import { useContext } from "react";
import homeImg from "../../../../../Assets/images/Capelo.png";
import DropdownComponent from "../../../../../Components/Dropdown";
import { RegisterContext } from "../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../Context/Register/type";
import { Column, Padding, Row } from "../../../../../Styles/styles";
import ImageTextSteps from "../../ImageTextStpes";
// import { RegistrationContext } from "../../containers/Registration/Context/context";

const Start = () => {

  const props = useContext(RegisterContext) as RegisterTypes;




  return (
    <>
      <Column className="contentStart" id="center">
        <ImageTextSteps img={homeImg} title="Matrícula Online" subTitle={<p style={{ textAlign: "center" }}>Bem-vindo ao Matrícula online, para <br /> iniciar escolha o plano de trabalho
          e clique no botão abaixo</p>} />
        <Row id="center">
          <div className="col-12 md:col-4">
            <DropdownComponent placerholder="Escolha o plano de trabalho" onChange={(e) => {props.setClassroom(e.target.value)}} options={props.project} optionsLabel="name" value={props.classroom} />
            {!props.classroom && true ? (
              <div style={{ color: "red", marginTop: "8px" }}>Plano de trabalho é obrigatório</div>
            ) : null}
          </div>
        </Row>
        <Padding padding={props.padding} />
        <Row id="center" className={"marginTop marginButtom"}>
          <div className="col-4">
            <Button
              type="button"
              onClick={() => {
                if (props.classroom) {
                  props.NextStep({})
                }
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

export default Start;
