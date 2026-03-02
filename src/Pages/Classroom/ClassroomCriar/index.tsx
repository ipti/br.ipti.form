import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentPage from "../../../Components/ContentPage";
import DropdownComponent from "../../../Components/Dropdown";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import ClassroomProvider, { ClassroomContext } from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { useFetchRequestCity, useFetchRequestState } from "../../../Services/Address/query";
import { getYear } from "../../../Services/localstorage";
import { Column, Padding, Row } from "../../../Styles/styles";

const FormClassroom = () => {
    return (
        <ClassroomProvider>
            <FormClassroomPage />
        </ClassroomProvider>
    )
}

const FormClassroomPage = () => {

    const { id } = useParams()
    const history = useNavigate()
    const [selectedState, setSelectedState] = useState<number | undefined>();

    const { data: states } = useFetchRequestState();
    const { data: cities } = useFetchRequestCity(selectedState);

    const initialValues = {
        name: "",
        state_fk: undefined as number | undefined,
        city_fk: undefined as number | undefined,
        neighborhood: "",
    }

    const props = useContext(ClassroomContext) as ClassroomTypes

    if (props.isLoading) return <Loading />;

    if (!id || id === "undefined") {
        return (
            <ContentPage title="Criar turma" description="Crie uma nova turma.">
                <Padding padding="16px" />
                <Column id="center" style={{ gap: "16px", alignItems: "center", textAlign: "center", padding: "32px" }}>
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: "48px", color: "#f59e0b" }} />
                    <h3>Nenhum plano de trabalho selecionado</h3>
                    <p style={{ color: "#6b7280" }}>
                        Para criar uma turma, você precisa primeiro criar um <strong>Plano de Trabalho</strong> no ano vigente.
                    </p>
                    <Padding padding="8px" />
                    <Button
                        label="Ir para turmas"
                        icon="pi pi-arrow-left"
                        onClick={() => history("/turma")}
                    />
                </Column>
            </ContentPage>
        );
    }

    return (
        <ContentPage title="Criar turma" description="Crie uma nova turma.">
            <Padding padding="16px" />
            <Formik initialValues={initialValues} onSubmit={(values) => { props.CreateClassroom({ ...values, project: parseInt(id!), year: parseInt(getYear()!) }) }}>
                {({ values, errors, handleChange, touched, setFieldValue }) => {
                    return (
                        <Form>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    <label>Nome *</label>
                                    <Padding />
                                    <TextInput name="name" onChange={handleChange} placeholder="Nome *" value={values.name} />
                                    <Padding />
                                    {errors.name && touched.name ? (
                                        <div style={{ color: "red", marginTop: "8px" }}>{errors.name}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    <label>Estado</label>
                                    <Padding />
                                    <DropdownComponent
                                        value={values.state_fk}
                                        name="state_fk"
                                        placerholder="Selecione o estado"
                                        options={states ?? []}
                                        optionsLabel="name"
                                        optionsValue="id"
                                        onChange={(e) => {
                                            handleChange(e);
                                            setSelectedState(e.target.value);
                                            setFieldValue("city_fk", undefined);
                                        }}
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <label>Cidade</label>
                                    <Padding />
                                    <DropdownComponent
                                        value={values.city_fk}
                                        name="city_fk"
                                        placerholder="Selecione a cidade"
                                        options={cities ?? []}
                                        optionsLabel="name"
                                        optionsValue="id"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-12 md:col-6">
                                    <label>Bairro/Povoado</label>
                                    <Padding />
                                    <TextInput
                                        name="neighborhood"
                                        onChange={handleChange}
                                        placeholder="Bairro/Povoado"
                                        value={values.neighborhood}
                                    />
                                </div>
                            </div>
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