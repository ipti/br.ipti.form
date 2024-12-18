import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ContentPage from "../../../Components/ContentPage";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import ClassroomProvider, { ClassroomContext } from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { getYear } from "../../../Services/localstorage";
import { Padding, Row } from "../../../Styles/styles";

const FormClassroom = () => {
    return (
        <ClassroomProvider>
            <FormClassroomPage />
        </ClassroomProvider>
    )
}

const FormClassroomPage = () => {

    const { id } = useParams()

    const initialValues = {
        name: ""
    }

    const props = useContext(ClassroomContext) as ClassroomTypes

    if (props.isLoading) return <Loading />;


    return (
        <ContentPage title="Criar turma" description="Crie uma nova turma.">
            <Padding padding="16px" />
            <Formik initialValues={initialValues} onSubmit={(values) => { props.CreateClassroom({ ...values, project: parseInt(id!), year: parseInt(getYear()!) }) }}>
                {({ values, errors, handleChange, touched }) => {
                    return (
                        <Form>
                            <label>Nome *</label>
                            <Padding />
                            <TextInput name="name" onChange={handleChange} placeholder="Nome *" value={values.name} />
                            <Padding />
                            {errors.name && touched.name ? (
                                <div style={{ color: "red", marginTop: "8px" }}>{errors.name}</div>
                            ) : null}
                            <Padding padding="16px" />
                            <Row id="end">
                                <Button label="Criar" icon={"pi pi-plus"} />
                            </Row>
                        </Form>
                    )
                }}
            </Formik>

        </ContentPage>
    )
}

export default FormClassroom;