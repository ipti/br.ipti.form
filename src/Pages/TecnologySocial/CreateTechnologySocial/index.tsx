import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useContext } from "react";
import * as Yup from "yup";
import ContentPage from "../../../Components/ContentPage";
import TextInput from "../../../Components/TextInput";
import CreateTsProvider, {
  CreateTsContext,
} from "../../../Context/TecnologySocial/CreateTecnologySocial/context";
import { CreateTsTypes } from "../../../Context/TecnologySocial/CreateTecnologySocial/type";
import { areaOptions } from "../../../Controller/controllerGlobal";
import { Padding, Row } from "../../../Styles/styles";

const CreateTechnologySocial = () => {
  return (
    <CreateTsProvider>
      <CreateTechnologySocialPage />
    </CreateTsProvider>
  );
};

const CreateTechnologySocialPage = () => {
  const props = useContext(CreateTsContext) as CreateTsTypes;

  const initialValues = {
    name: "",
    area_of_activity: "",
  };

 

  const CreateTsSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <ContentPage title="Criar Tecnologia" description="Crie sua tecnologia social.">
      <Padding padding="16px" />
      <Formik
        initialValues={initialValues}
        validationSchema={CreateTsSchema}
        onSubmit={(values) => {
          console.log(values);
          props.CreateTechnology({
            name: values.name,
            area_of_activity: values.area_of_activity || undefined,
            // area_of_activity: values.area_of_activity || undefined,
          });
        }}
      >
        {({ values, errors, handleChange, setFieldValue, touched }) => {
          return (
            <Form>
              <Row id="end">
                <Button label="Criar" icon={"pi pi-plus"} />
              </Row>
              <div className="col-12 md:col-6">
                <label>Nome*</label>
                <Padding />
                <TextInput
                  name="name"
                  onChange={handleChange}
                  placeholder="Nome*"
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <div style={{ color: "red", marginTop: "8px" }}>{errors.name}</div>
                )}
                <Padding padding="16px" />
                <label>Área de Atuação</label>
                <Padding />
                <Dropdown
                  name="area_of_activity"
                  value={values.area_of_activity}
                  options={areaOptions}
                  optionLabel="name"
                  optionValue="id"
                  onChange={handleChange}
                  placeholder="Selecione a área de atuação"
                  style={{ width: "100%" }}
                />
              </div>
              <Padding padding="16px" />
            </Form>
          );
        }}
      </Formik>
    </ContentPage>
  );
};

export default CreateTechnologySocial;
