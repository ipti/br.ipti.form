import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import * as Yup from "yup";
import EditTsProvider, { EditTsContext } from "../../../../Context/TecnologySocial/EditTecnologySocial/context";
import { EditTsTypes } from "../../../../Context/TecnologySocial/EditTecnologySocial/type";
import { Padding, Row } from "../../../../Styles/styles";
import TextInput from "../../../../Components/TextInput";

type EditTsDialogProps = {
  visible: boolean;
  onHide: () => void;
  id: number;
  title: string;
};

const EditTsDialog = (props: EditTsDialogProps) => {
  return (
    <EditTsProvider>
      <EditTsDialogContent {...props} />
    </EditTsProvider>
  );
};

const EditTsDialogContent = ({ visible, onHide, id, title }: EditTsDialogProps) => {
  const editProps = useContext(EditTsContext) as EditTsTypes;

  const EditSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <Dialog
      header="Editar Tecnologia Social"
      visible={visible}
      onHide={onHide}
      style={{ width: "400px" }}
    >
      <Formik
        initialValues={{ name: title }}
        validationSchema={EditSchema}
        enableReinitialize
        onSubmit={(values) => {
          editProps.EditTechnology({ stId: id, body: { name: values.name } });
          onHide();
        }}
      >
        {({ values, errors, handleChange, touched }) => (
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
