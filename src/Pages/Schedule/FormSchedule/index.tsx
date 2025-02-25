import { Button } from "primereact/button";
import { Column, Container, Padding, Row } from "../../../Styles/styles";

import { Form, Formik } from "formik";
import { useContext } from "react";
import CalendarComponent from "../../../Components/Calendar";
import ScheduleProvider, {
  ScheduleContext,
} from "../../../Context/Schedule/context";
import { CreateSchedule, ScheduleTypes } from "../../../Context/Schedule/type";
import { GetIdProject } from "../../../Services/localstorage";

const FormSchedule = () => {
  return (
    <ScheduleProvider>
      <FormSchedulePage />
    </ScheduleProvider>
  );
};

const FormSchedulePage = () => {


 
  
  const initialValueCreate: CreateSchedule = {
    start_date:  "",
    end_date:"",
    project: [parseInt(GetIdProject()!)],
  };

  const props = useContext(ScheduleContext) as ScheduleTypes;

  return (
    <Container>
      <div className="card">
        <Padding>
          <h3>{"Criar"} cronograma</h3>
          <Padding padding="16px" />
         
            <Formik
              initialValues={initialValueCreate}
              onSubmit={(values) => {
                props.CreateSchedule(values);
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <div className="grid">
                      <Column className="col-12 md:col-6">
                        <label>Data de inicio</label>
                        <CalendarComponent
                          onChange={handleChange}
                          dateFormat="dd/mm/yy"
                          placeholder="Data de inicio"
                          value={values.start_date}
                          name="start_date"
                        />
                      </Column>
                      <Column className="col-12 md:col-6">
                        <label>Data final</label>
                        <CalendarComponent
                          onChange={handleChange}
                          dateFormat="dd/mm/yy"
                          placeholder="Data final"
                          value={values.end_date}
                          name="end_date"
                        />
                      </Column>
                    </div>
                    {/* <Padding />
                  <div className="col-12 md:col-6">
                    <Column>
                      <label>Ano de referencia</label>
                      <Calendar
                        view="year"
                        dateFormat="yy"
                        onChange={handleChange}
                        name="year"
                      />
                    </Column>
                  </div> */}
                    <Padding padding="16px" />
                    <Row id="end">
                      <Button label="Criar" icon={"pi pi-plus"} />
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          
        </Padding>
      </div>
    </Container>
  );
};

export default FormSchedule;
