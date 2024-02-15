import { Button } from "primereact/button";
import { Column, Container, Padding, Row } from "../../../Styles/styles";

import { Form, Formik } from "formik";
import { Calendar } from 'primereact/calendar';
import { useContext } from "react";
import CalendarComponent from "../../../Components/Calendar";
import { ScheduleContext } from "../../../Context/Schedule/context";
import { CreateSchedule, ScheduleTypes } from "../../../Context/Schedule/type";


const FormSchedule = () => {
    const initialValue: CreateSchedule = {
        start_date: "",
        end_date: "",
        school_identificationArray: 201902,
        year: "",
    }
    const props = useContext(ScheduleContext) as ScheduleTypes

    return (
        <Container>
            <div className="card">
                <Padding>
                    <h3>Criar cronograma</h3>
                    <Padding padding="16px" />
                    <Formik initialValues={initialValue} onSubmit={(values) => {
                        props.CreateSchedule(values)
                    }}>
                        {({ values, handleChange }) => {
                            console.log(values)
                            return (
                                <Form>
                                    <div className="grid">

                                        <Column className="col-12 md:col-6">
                                            <label>Data de inicio</label>
                                            <CalendarComponent onChange={handleChange} dateFormat="dd/mm/yy" value={values.start_date} name="start_date" />
                                        </Column>
                                        <Column className="col-12 md:col-6">
                                            <label>Data final</label>
                                            <CalendarComponent onChange={handleChange} dateFormat="dd/mm/yy" value={values.end_date} name="end_date" />
                                        </Column>
                                    </div>
                                    <Padding />
                                    <div className="col-12 md:col-6">
                                        <Column>
                                            <label>Ano de referencia</label>
                                            <Calendar view="year" dateFormat="yy" onChange={handleChange} name="year" />
                                        </Column>
                                    </div>
                                    <Padding padding="16px" />
                                    <Row id="end">
                                        <Button label="Criar" />
                                    </Row>
                                </Form>
                            )
                        }}
                    </Formik>


                </Padding>
            </div>
        </Container>
    )
}

export default FormSchedule;