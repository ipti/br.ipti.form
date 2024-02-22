import { Button } from "primereact/button";
import { useContext, useState } from "react";
import homeImg from "../../../../../Assets/images/Capelo.png";
import { Column, Row } from "../../../../../Styles/styles";
import DropdownComponent from "../../../../../Components/Dropdown";
import { RegisterContext } from "../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../Context/Register/type";
// import { RegistrationContext } from "../../containers/Registration/Context/context";

const Start = () => {
  const [isValid, setIsValid] = useState();
  // const { setIdEvent, idEvent, setSchool, setYear, schools, school } = useContext(RegistrationContext);

  // const onButton = () => {
  //   if (startDate <= date.getTime() && date.getTime() <= (endDate + 87000000) && idEvent !== '') {
  //     props.setIsActive(true)
  //     props.next('1', { school_identification: school.inep_id, event_pre_registration: idEvent })
  //   } else {
  //     props.setIsActive(false)
  //   }
  // }

  const props = useContext(RegisterContext) as RegisterTypes;

  return (
    <>
      <Column className="contentStart" id="center">
        <div className="col-12">
          <Row id="center">
            <img className="imageRegistration" src={homeImg} alt="" />
          </Row>
        </div>
        <div className="col-12">
          <Row id="center">

            <h1>Matrícula Online</h1>
          </Row>
          <Row id="center">
            <p>
              Bem-vindo ao Matrícula online, para <br /> iniciar escolha o projeto
              e clique no botão abaixo
            </p>
          </Row>
        </div>
        <Row id="center">
          <div className="col-12 md:col-4">
            <DropdownComponent placerholder="Escolha o projeto" />
          </div>
        </Row>
        <div className="col-12">
          {/* <FormControl
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel style={{ display: 'flex', flexDirection: 'row', justifyContent: "start" }} >Projeto *</FormLabel>
            <Select
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
              placeholder="Digite o nome da projeto"
              options={schools}
              isLoading={!schools}
              onChange={selectedOption => {
                setSchool(selectedOption)
                setIsValid(true)
                const last_event = selectedOption.event_pre_registration.length - 1;
                if (selectedOption.event_pre_registration[last_event]) {
                  setIdEvent(selectedOption.event_pre_registration[last_event].id)
                  setStartDate(new Date(selectedOption.event_pre_registration[last_event].start_date).getTime())
                  setEndDate(new Date(selectedOption.event_pre_registration[last_event].end_date).getTime())
                  setYear(new Date(selectedOption.event_pre_registration[last_event].end_date).getFullYear())
                } else {
                  props.setIsActive(false)
                }
              }}
              getOptionValue={opt => opt.inep_id}
              getOptionLabel={opt => opt.name}
            />
          </FormControl> */}
        </div>
        <Row id="center" className={"marginTop marginButtom"}>
          <div className="col-4">
            <Button
              type="button"
              onClick={props.NextStep}
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