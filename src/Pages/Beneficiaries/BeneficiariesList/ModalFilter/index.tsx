import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import MaskInput from "../../../../Components/InputMask";
import TextInput from "../../../../Components/TextInput";
import { Column, Padding, Row } from "../../../../Styles/styles";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { BeneficiariesListContext } from "../../../../Context/Beneficiaries/BeneficiariesList/context";
import { BeneficiariesListType } from "../../../../Context/Beneficiaries/BeneficiariesList/type";

const ModalFilter = ({
  onHide,
  visible,
}: {
  onHide(): void;
  visible?: boolean | undefined;
}) => {
  const props = useContext(BeneficiariesListContext) as BeneficiariesListType;
  return (
    <Dialog
      onHide={onHide}
      visible={visible}
      style={{ width: window.innerWidth < 800 ? "80vw" : "50vw" }}
    >
      <Formik
        initialValues={{
          name: props.nameFilter ?? "",
          cpf: props.cpfFilter ?? "",
        }}
        onSubmit={(values) => {
          props.handleFilter(values);
          onHide();
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Nome</label>
                  <Padding />
                  <TextInput
                    value={values.name}
                    placeholder="Digite um nome"
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="col-12 md:col-6">
                  <label>CPF</label>
                  <Padding />
                  <MaskInput
                    value={values.cpf}
                    mask="999.999.999-99"
                    placeholder="CPF"
                    onChange={handleChange}
                    name="cpf"
                  />
                </div>
                {/* <div className="col-12 md:col-6">
                  <label>Sexo</label>
                  <Padding />
                  <DropdownComponent
                    //   value={values.sex}
                    optionsLabel="type"
                      options={props.typesex}
                    name="sex"
                    //   onChange={handleChange}
                  />
                </div> */}
              </div>{" "}
              <div className="grid">
                {/* <div className="col-12 md:col-6">
                  <label>Deficiente</label>
                  <Padding />
                  <DropdownComponent
                    //   value={values.deficiency}
                    placerholder="Deficiente"
                    name="deficiency"
                    //   onChange={handleChange}
                    options={[
                      { id: true, name: "Sim" },
                      { id: false, name: "Não" },
                    ]}
                  />
                </div> */}
              </div>{" "}
              <Padding padding="16px" />
              <Column style={{ width: "100%" }}>
                <Row id="end">
                  <Button
                    label="Limpar filtro"
                    text
                    type="button"
                    onClick={() => {props.handleFilter({ name: "", cpf: "" }); onHide()}}
                  />
                  <Padding />
                  <Button label="Filtrar" />
                </Row>
              </Column>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ModalFilter;
