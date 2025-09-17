import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Chart as ChartPrime } from "primereact/chart";

import { useContext, useState, useEffect } from "react";

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
import {
  getStatusClassroomList,
  ROLE,
} from "../../../Controller/controllerGlobal";
import { useFetchRequestClassroomOne } from "../../../Services/Classroom/query";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import CardItensClassrooom from "./CardItensClassroom";
import ModalChange from "./ModalChangeClaassroom";
import color from "../../../Styles/colors";

import { requestChartFrequency } from "../../../Services/Chart/request";
import { StateCard } from "../../../Types/states-cards";
import { requestClassroomZipArchives, requestCountStates } from "../../../Services/Classroom/request";
import CardQuant from "../../../Components/Chart/CardQuant";

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
  const [cards, setCards] = useState<StateCard[]>([]);

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestChartFrequency(classroom?.id);

        if (!response?.data || response.data.length === 0) {
          console.warn("Nenhum dado válido retornado da API.");
          return;
        }

        const data: {
          name: string;
          frequency: number;
          beneficiarios: number;
        }[] = response.data;

        const updatedChartData = {
          labels: data.map((item) => item.name),
          datasets: [
            {
              label: "Numero de Beneficiários",
              data: data.map((item) => item.beneficiarios),
              borderColor: color.gray,
              fill: false,
            },
            {
              label: "Faltas por encontro",
              data: data.map((item) => item.frequency),
              borderColor: color.red,
              backgroundColor: color.red + "44",
              tension: 0.4,
              fill: true,
            },
          ],
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    const cardsData = async () => {
      const counts = await requestCountStates(classroom?.id);
      setCards(counts);
    };

    fetchData();
    cardsData();
  }, [classroom?.id]);

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (props.isLoading) return <Loading />;

 const handleDownload = async () => {
  try {
    const response = await requestClassroomZipArchives(classroom?.id!);
    // gera URL do blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // tenta extrair nome do arquivo do header (se o backend mandar)
    const contentDisposition = response.headers['content-disposition'];

    let fileName = `turma-${classroom?.name}.zip`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match?.[1]) {
        fileName = match[1];
      }
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert('Não foi possível baixar o arquivo');
  }
};

  return (
    <ContentPage title={classroom?.name} description="Detalhes da sua turma.">
      {edit ? (
        <>
          {classroom ? (
            <Formik
              initialValues={{
                name: classroom?.name,
                status: getStatusClassroomList().find(
                  (props) => props.id === classroom?.status
                ),
              }}
              onSubmit={(values) => {
                props.UpdateClassroom(
                  { name: values.name, status: values.status?.id! },
                  parseInt(id!)
                );
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
                          <DropdownComponent
                            options={getStatusClassroomList()}
                            name="status"
                            value={values.status}
                            placerholder="Status da turma"
                            onChange={handleChange}
                          />
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
              {(propsAplication.user?.role === ROLE.ADMIN ||
                propsAplication.user?.role === ROLE.COORDINATORS) && (
                <Button
                  text
                  label="Baixar evidê,ncias"
                  icon="pi pi-download"
                  onClick={handleDownload}
                />
              )}
            </Row>
            <Row>
              <Padding />
              {(propsAplication.user?.role === ROLE.ADMIN ||
                propsAplication.user?.role === ROLE.COORDINATORS) && (
                <Button
                  text
                  label="Editar"
                  icon="pi pi-pencil"
                  onClick={() => setEdit(true)}
                />
              )}
            </Row>
            {(propsAplication.user?.role === ROLE.ADMIN ||
              propsAplication.user?.role === ROLE.COORDINATORS) && (
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
          />
        </div>
      </div>

      <div className="grid">
        {cards.map((item) => (
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title={item.status}
              quant={item.number}
              color={
                item.status === "Aprovados"
                  ? "orange"
                  : item.status === "Pendentes"
                  ? "blue"
                  : "navy_blue"
              }
            />
          </div>
        ))}
      </div>

      <div
        className="card col-12 md:col-12 lg:col-12"
        style={{ padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Gráfico Faltas em Encontros</h2>
          <Padding padding="8px" />
          <ChartPrime
            type="line"
            data={chartData}
            style={{ height: "400px", flexGrow: 1 }}
            width="55%"
          />
        </div>
      </div>
    </ContentPage>
  );
};

export default ClassroomOne;
