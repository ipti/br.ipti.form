import { Form } from "formik";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import DropdownComponent from "../../../Components/Dropdown";
import TextInput from "../../../Components/TextInput";
import PasswordInput from "../../../Components/TextPassword";
import { ROLE } from "../../../Controller/controllerGlobal";
import { useFetchRequestSocialTechnologyLists } from "../../../Services/SocialTechnology/query";
import { Padding } from "../../../Styles/styles";
import { useContext } from "react";
import { AplicationContext } from "../../../Context/Aplication/context";
import { PropsAplicationContext } from "../../../Types/types";

const InputsUser = ({
  values,
  handleChange,
  errors,
  touched,
}: {
  values: any;
  handleChange: any;
  errors: any;
  touched: any;
}) => {
  const { data: projects } = useFetchRequestSocialTechnologyLists();

  const props = useContext(AplicationContext) as PropsAplicationContext

  return (
    <Form>
      <div className="grid">
        <div className="col-12 md:col-6">
          <label>Nome</label>
          <Padding />
          <TextInput
            placeholder="Nome"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <Padding />
          {errors.name && touched.name ? (
            <div style={{ color: "red" }}>
              {errors.name}
              <Padding />
            </div>
          ) : null}
        </div>

        <div className="col-12 md:col-6">
          <label>Usuário</label>
          <Padding />
          <TextInput
            placeholder="Usuário"
            value={values.username}
            onChange={handleChange}
            name="username"
          />
          <Padding />
          {errors.username && touched.username ? (
            <div style={{ color: "red" }}>
              {errors.username}
              <Padding />
            </div>
          ) : null}
        </div>
      </div>{" "}
      <div className="grid">
        <div className="col-12 md:col-6">
          <label>Tipo de usuário</label>
          <Padding />
          <DropdownComponent
            name="role"
            placerholder="Tipo de usuário"
            optionsLabel="name"
            value={values.role}
            onChange={handleChange}
            options={props.user?.role === ROLE.ADMIN ? [
              { id: ROLE.ADMIN, name: "Admin" },
              { id: ROLE.COORDINATORS, name: "Coordenador" },
              { id: ROLE.REAPPLICATORS, name: "Reaplicador" },
            ] : [
              { id: ROLE.COORDINATORS, name: "Coordenador" },
              { id: ROLE.REAPPLICATORS, name: "Reaplicador" },
            ]}
          />
          <Padding />
          {errors.role && touched.role ? (
            <div style={{ color: "red" }}>
              {errors.role}
              <Padding />
            </div>
          ) : null}
        </div>
        <div className="col-12 md:col-6">
          <label>Projetos</label>
          <Padding />
          <MultiSelect
            options={projects}
            optionLabel="name"
            name="project"
            value={values.project}
            onChange={handleChange}
            filter
            placeholder="Projetos"
            maxSelectedLabels={3}
            className="w-full"
          />
          <Padding />
          {errors.project && touched.project ? (
            <div style={{ color: "red" }}>
              {errors.project}
              <Padding />
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6">
          <label>Senha</label>
          <Padding />
          <PasswordInput
            placeholder="Senha"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          <Padding />
          {errors.password && touched.password ? (
            <div style={{ color: "red" }}>
              {errors.password}
              <Padding />
            </div>
          ) : null}
        </div>
        <div className="col-12 md:col-6">
          <label>Confirmar senha</label>
          <Padding />
          <PasswordInput
            placeholder="Senha"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <Padding />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div style={{ color: "red" }}>
              {errors.confirmPassword}
              <Padding />
            </div>
          ) : null}
        </div>
      </div>{" "}
      <Padding padding="16px" />
      <Button label="Criar" />
    </Form>
  );
};

export default InputsUser;
