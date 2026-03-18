import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useContext } from "react";
import * as Yup from "yup";
import TextInput from "../../../../Components/TextInput";
import EditTsProvider, { EditTsContext } from "../../../../Context/TecnologySocial/EditTecnologySocial/context";
import { EditTsTypes } from "../../../../Context/TecnologySocial/EditTecnologySocial/type";
import { areaOptions } from "../../../../Controller/controllerGlobal";
import { Padding, Row } from "../../../../Styles/styles";

type EditTsDialogProps = {
  visible: boolean;
  onHide: () => void;
  id: number;
  title: string;
  area_of_activity?: string;
};

const EditTsDialog = (props: EditTsDialogProps) => {
  return (
    <EditTsProvider>
      <EditTsDialogContent {...props} />
    </EditTsProvider>
  );
};

const EditTsDialogContent = ({ visible, onHide, id, title, area_of_activity }: EditTsDialogProps) => {
  const editProps = useContext(EditTsContext) as EditTsTypes;



  const EditSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
  });

  console.log("area_of_activity", area_of_activity);

  return (
    <Dialog
      header="Editar Tecnologia Social"
      visible={visible}
      onHide={onHide}
      style={{ width: "400px" }}
    >
      <Formik
        initialValues={{ name: title, area_of_activity: area_of_activity || "" }}
        validationSchema={EditSchema}
        enableReinitialize
        onSubmit={(values) => {
          editProps.EditTechnology({
            stId: id,
            body: {
              name: values.name,
              area_of_activity: values.area_of_activity || undefined,
            },
          });
          onHide();
        }}
      >
        {({ values, errors, handleChange, setFieldValue, touched }) => (
          <Form>
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
            <Padding padding="16px" />
            <Row id="end">
              <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-text"
                onClick={onHide}
                type="button"
              />
              <Button
                label="Salvar"
                icon="pi pi-check"
                loading={editProps.loading}
                type="submit"
              />
            </Row>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditTsDialog;
