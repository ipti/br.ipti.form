import { Form } from "formik";
import { MultiSelect } from "primereact/multiselect";
import { useContext } from "react";
import DropdownComponent from "../../../Components/Dropdown";
import MaskInput from "../../../Components/InputMask";
import TextInput from "../../../Components/TextInput";
import { AplicationContext } from "../../../Context/Aplication/context";
import {
  color_race,
  ROLE,
  typesex,
} from "../../../Controller/controllerGlobal";
import { useFetchRequestSocialTechnologyLists } from "../../../Services/SocialTechnology/query";
import { Padding } from "../../../Styles/styles";
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

  const props = useContext(AplicationContext) as PropsAplicationContext;
  console.log(errors);
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
            optionsValue="id"
            value={values.role}
            onChange={handleChange}
            options={
              props.user?.role === ROLE.ADMIN
                ? [
                    { id: ROLE.ADMIN, name: "Admin" },
                    { id: ROLE.COORDINATORS, name: "Coordenador" },
                    { id: ROLE.REAPPLICATORS, name: "Reaplicador" },
                  ]
                : [
                    { id: ROLE.COORDINATORS, name: "Coordenador" },
                    { id: ROLE.REAPPLICATORS, name: "Reaplicador" },
                  ]
            }
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
          <div>
            <label>Cor/Raça *</label>
            <Padding />
            <DropdownComponent
              placerholder="Cor/Raça *"
              value={values.color_race}
              onChange={handleChange}
              name="color_race"
              optionsValue="id"
              optionsLabel="name"
              options={color_race}
            />
          </div>
          {errors.color_race && touched.color_race ? (
            <div style={{ color: "red", marginTop: "8px" }}>
              {errors.color_race}
            </div>
          ) : null}
        </div>

        <div className="col-12 md:col-6">
          <div>
            <label>Data de Nascimento *</label>
            <Padding />
            <MaskInput
              mask="99/99/9999"
              value={values.birthday?.toString()}
              placeholder="Data de Nascimento"
              name="birthday"
              onChange={handleChange}
            />
          </div>
          {errors.birthday && touched.birthday ? (
            <div style={{ color: "red", marginTop: "8px" }}>
              {errors.birthday}
            </div>
          ) : null}
        </div>
      </div>{" "}
      <div className="grid">
        <div className="col-12 md:col-6">
          <label>Sexo *</label>
          <Padding />
          <DropdownComponent
            placerholder="Sexo *"
            optionsValue="id"
            value={values.sex}
            options={typesex}
            name="sex"
            onChange={handleChange}
            optionsLabel="type"
          />
          {errors.sex && touched.sex ? (
            <div style={{ color: "red", marginTop: "8px" }}>{errors.sex}</div>
          ) : null}
        </div>
        <div className="col-12 md:col-6">
          <label>Data de inicio *</label>
          <Padding />
          <MaskInput
            mask="99/99/9999"
            placeholder="Data de inicio *"
            name="initial_date"
            value={values.initial_date}
            onChange={handleChange}
          />
          {errors.initial_date && touched.initial_date ? (
            <div style={{ color: "red", marginTop: "8px" }}>
              {errors.initial_date}
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6">
          <label>Email *</label>
          <Padding />
          <TextInput
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            name="email"
          />
          {errors.email && touched.email ? (
            <div style={{ color: "red", marginTop: "8px" }}>{errors.email}</div>
          ) : null}
        </div>
        <div className="col-12 md:col-6">
          <label>Telefone para contato*</label>
          <Padding />
          <MaskInput
            mask="(99) 9 9999-9999"
            placeholder="Telefone *"
            name="phone"
            onChange={handleChange}
            value={values.phone}
          />
          {errors.phone && touched.phone ? (
            <div style={{ color: "red", marginTop: "8px" }}>{errors.phone}</div>
          ) : null}
        </div>
      </div>
    </Form>
  );
};

export default InputsUser;
