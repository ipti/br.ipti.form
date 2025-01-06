import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ContentPage from "../../../Components/ContentPage";
import InputNumberComponent from "../../../Components/InputNumber";
import TextInput from "../../../Components/TextInput";
import CreateProjectProvider, {
  CreateProjectContext,
} from "../../../Context/Project/CreateList/context";
import { CreateProjectTypes } from "../../../Context/Project/CreateList/type";
import { GetIdTs } from "../../../Services/localstorage";
import { Padding, Row } from "../../../Styles/styles";


const CreateProjects = () => {
  return (
    <CreateProjectProvider>
      <CreateProjectsPage />
    </CreateProjectProvider>
  );
};

const CreateProjectsPage = () => {
  const props = useContext(CreateProjectContext) as CreateProjectTypes;
  const CreateProjectSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
    approval_percentage: Yup.number().required("Campo Obrigatório")
  });

  const initialValues = {
    name: "",
    approval_percentage: undefined,
  };

  return (
    <ContentPage title="Criar plano de trabalho" description="Criar um novo plano de trabalho.">
      <Padding padding="16px" />
      <Formik
        initialValues={initialValues}
        validationSchema={CreateProjectSchema}
        onSubmit={(values) => {
          if(GetIdTs() !== "undefined") {props.CreateProject({
            name: values.name,
            approval_percentage: values.approval_percentage!,
            socialTechnologyId: parseInt(GetIdTs()!),
          });} else {
            Swal.fire("Crie ou selecione uma Tecnologia")
          }
        }}
      >
        {({ values, errors, handleChange, touched }) => {
          return (
            <Form>
              <Row id="end">
                <Button label="Criar" icon={"pi pi-plus"} />
              </Row>
              <Padding padding="32px" />
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Nome do plano de trabalho *</label>
                  <Padding />
                  <TextInput
                    name="name"
                    onChange={handleChange}
                    placeholder="Nome do plano de trabalho*"
                    value={values.name}
                  />
                  <Padding />
                  {errors.name && touched.name ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 md:col-6">
                  <label>Porcentagem de aprovação do plano de trabalho *</label>
                  <Padding />
                  <InputNumberComponent
                    name="approval_percentage"
                    onChange={handleChange}
                    suffix="%"
                    placeholder="Porcentagem de aprovação do plano de trabalho *"
                    value={values.approval_percentage}
                  />
                  <Padding />
                  {errors.approval_percentage && touched.approval_percentage ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.approval_percentage}
                    </div>
                  ) : null}
                </div>
              </div>
              <Padding padding="16px" />
            </Form>
          );
        }}
      </Formik>
    </ContentPage>
  );
};

export default CreateProjects;
