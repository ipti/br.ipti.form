import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Chart as ChartPrime } from "primereact/chart";

import React, {useContext, useState, useEffect } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import pessoas from "../../../Assets/images/pessoasgray.svg";

import report from "../../../Assets/images/report-svgrepo-com.svg";
import meeting from "../../../Assets/images/school_teacher.svg";
import TextInput from "../../../Components/TextInput";

import ContentPage from "../../../Components/ContentPage";
import DropdownComponent from "../../../Components/Dropdown";
import Loading from "../../../Components/Loading";
import { AplicationContext } from "../../../Context/Aplication/context";
import ClassroomProvider, {
  ClassroomContext,
} from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { getStatusClassroomList, ROLE } from "../../../Controller/controllerGlobal";
import { useFetchRequestClassroomOne } from "../../../Services/Classroom/query";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import CardItensClassrooom from "./CardItensClassroom";
import ModalChange from "./ModalChangeClaassroom";

const ClassroomOne = () => {
  return (
    <ClassroomProvider>
      <ClassroomOnePage />
    </ClassroomProvider>
  );
};

const ClassroomOnePage = () => {
  const history = useNavigate();
  const { id } = useParams();
  const props = useContext(ClassroomContext) as ClassroomTypes;
  const { data: classroom } = useFetchRequestClassroomOne(parseInt(id!));
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

    setChartData(data);
    setChartOptions(options);
}, []);


  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (props.isLoading) return <Loading />;

  return (
    <ContentPage title={classroom?.name} description="Detalhes da sua turma.">
      {edit ? (
        <>
          {classroom ? (
            <Formik
              initialValues={{ name: classroom?.name, status: getStatusClassroomList().find(props => props.id === classroom?.status) }}
              onSubmit={(values) => {
                props.UpdateClassroom({ name: values.name, status: values.status?.id! }, parseInt(id!));
                setEdit(false);
              }}
            >
              {({ values, handleChange }) => {

                return (
                  <Form>
                    <Column>
                      <div className="grid">
                        <div className="col-12 md:col-6">
                          <label>Nome da turma</label>
                          <Padding />
                          <TextInput
                            name="name"
                            placeholder="Nome da turma"
                            onChange={handleChange}
                            value={values.name}
                          />
                        </div>
                        <div className="col-12 md:col-6">
                          <label>Status da turma</label>
                          <Padding />
                          <DropdownComponent options={getStatusClassroomList()} name="status" value={values.status} placerholder="Status da turma" onChange={handleChange} />
                        </div>
                      </div>
                      <Padding />
                      <Row>

                        <Button label="Salvar" icon={"pi pi-save"} />
                        <Padding />
                        <Button
                          label="Cancelar"
                          severity="secondary"
                          type="button"
                          onClick={() => setEdit(false)}
                        />
                      </Row>
                    </Column>
                  </Form>
                );
              }}
            </Formik>
          ) : null}
        </>
      ) : (
        <Column>
          <Row id="end">
            <Row>
              <Padding />
              {(propsAplication.user?.role ===
                ROLE.ADMIN || propsAplication.user?.role === ROLE.COORDINATORS) && (
                  <Button
                    text
                    label="Editar"
                    icon="pi pi-pencil"
                    onClick={() => setEdit(true)}
                  />
                )}
            </Row>
            {(propsAplication.user?.role ===
                ROLE.ADMIN || propsAplication.user?.role === ROLE.COORDINATORS) && (
                <Button
                  text
                  label="Tranferir turma"
                  icon="pi pi-sync"
                  onClick={() => setVisible(true)}
                />
              )}
          </Row>
        </Column>
      )}
      <Padding padding="16px" />
      <div className="grid">
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/alunos`)}
        >
          <CardItensClassrooom
            title="Matriculas"
            description="Acesse para gerenciar seus alunos"
            icon={pessoas}
            count={classroom?.register_classroom?.length}
          />
        </div>
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/encontros`)}
        >
          <CardItensClassrooom
            title="Encontros"
            description="Acesse para Gerenciar seus encontros"
            icon={meeting}
            count={classroom?.meeting?.length}
          />
        </div>
        {/* <div className="col-12 md:col-6" onClick={() => history(`/turma/${id}/relatorio`)}>
                    <CardItensClassrooom title="Tabela" description="Relatório entre Alunos e Encontros" icon="pi pi-table" />
                </div> */}
        <ModalChange visible={visible} onHide={() => setVisible(false)} />
      </div>
      <div className="grid">
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/relatorio`)}
        >
          <CardItensClassrooom
            title="Relatório"
            description="Acesse o relatório da turma"
            icon={report}
          // count={classroom?.register_classroom?.length}
          />
        </div>
      </div>

      <div className="card">
        <ChartPrime type="line" data={chartData} options={chartOptions} />
      </div>
    </ContentPage>
  );
};

export default ClassroomOne;
