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
import { ClassroomTypes, MediafrequencyType } from "../../../Context/Classroom/type";
import {
  formatarData,
  getStatusClassroomList,
  ROLE,
} from "../../../Controller/controllerGlobal";
import { useFetchRequestClassroomOne, useFetchRequestFoulsClassroomOne } from "../../../Services/Classroom/query";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import CardItensClassrooom from "./CardItensClassroom";
import ModalChange from "./ModalChangeClaassroom";
import ModalReuseClassroom from "./ModalReuseClassroom";
import color from "../../../Styles/colors";

import { requestChartFrequency } from "../../../Services/Chart/request";
import { StateCard } from "../../../Types/states-cards";
import { requestClassroomZipArchives, requestCountStates } from "../../../Services/Classroom/request";
import CardQuant from "../../../Components/Chart/CardQuant";
import { Popover } from "react-tiny-popover";
import Icon from "../../../Components/Icon";

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
  const { data: foulsRequest } = useFetchRequestFoulsClassroomOne(parseInt(id!));
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleReuse, setVisibleReuse] = useState(false);
  const [cards, setCards] = useState<StateCard[]>([]);
  const [actionsPopoverOpen, setActionsPopoverOpen] = useState(false);
  const [loadingEvi, setLoadingEvi] = useState(false);
  var fouls = foulsRequest as MediafrequencyType;


  const totalMedia = fouls?.reduce((sum, item) => sum + item.media, 0);

  // Calcula a média das médias
  const mediaDasMedias = totalMedia / (fouls?.length || 1);

  const [chartData, setChartData] = useState<any>({});

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
          meeting_date: string;
        }[] = response.data;

        const updatedChartData = {
          labels: data.map((item) => formatarData(item.meeting_date)),
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


  console.log("fouls", chartData);
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (props.isLoading) return <Loading />;

  const handleDownload = async () => {
    try {
      setLoadingEvi(true);
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
      setLoadingEvi(false);
    } catch (err) {
      console.error(err);
      setLoadingEvi(false);
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
            {(propsAplication.user?.role === ROLE.ADMIN ||
              propsAplication.user?.role === ROLE.COORDINATORS) && (
                <Popover
                  isOpen={actionsPopoverOpen}
                  positions={["bottom", "left", "right", "top"]}
                  onClickOutside={() => setActionsPopoverOpen(false)}
                  content={
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        minWidth: "180px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <Row
                        onClick={() => {
                          if (!loadingEvi) {
                            handleDownload();
                            setActionsPopoverOpen(false);
                          }
                        }}
                        id="space-between"
                        style={{ cursor: loadingEvi ? "not-allowed" : "pointer", padding: "8px", gap: "8px", opacity: loadingEvi ? 0.6 : 1 }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          {loadingEvi
                            ? <i className="pi pi-spin pi-spinner" style={{ fontSize: "16px" }} />
                            : <Icon icon="pi pi-download" size="16px" />
                          }
                        </div>
                        <p>{loadingEvi ? "Baixando..." : "Baixar evidências"}</p>
                      </Row>
                      <Row
                        onClick={() => {
                          setEdit(true);
                          setActionsPopoverOpen(false);
                        }}
                        id="space-between"
                        style={{ cursor: "pointer", padding: "8px", gap: "8px" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <Icon icon="pi pi-pencil" size="16px" />
                        </div>
                        <p>Editar</p>
                      </Row>
                      <Row
                        onClick={() => {
                          setVisible(true);
                          setActionsPopoverOpen(false);
                        }}
                        id="space-between"
                        style={{ cursor: "pointer", padding: "8px", gap: "8px" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <Icon icon="pi pi-sync" size="16px" />
                        </div>
                        <p>Transferir turma</p>
                      </Row>
                      <Row
                        onClick={() => {
                          setVisibleReuse(true);
                          setActionsPopoverOpen(false);
                        }}
                        id="space-between"
                        style={{ cursor: "pointer", padding: "8px", gap: "8px" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <Icon icon="pi pi-copy" size="16px" />
                        </div>
                        <p>Reaproveitar turma</p>
                      </Row>
                    </div>
                  }
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setActionsPopoverOpen(!actionsPopoverOpen)}
                  >
                    <Icon icon="pi pi-ellipsis-v" />
                  </div>
                </Popover>
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
              title={'Matriculas ' + item.status}
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
        <div className="col-12 md:col-4 lg:col-2">
          {fouls?.length > 0 && <CardQuant
            title={'Média de presença da turma'}
            quant={mediaDasMedias?.toFixed(2) + '%'}
            color={
              "navy_blue"
            }
          />}
        </div>
      </div>

      {(chartData && chartData?.labels?.length > 0) && <div
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
            style={{ maxHeight: "500px", flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
            width="100%"
          />
        </div>
      </div>}
      {loadingEvi && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#1e1e2f",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "18px" }} />
          <span>Gerando evidências, aguarde...</span>
        </div>
      )}
      <ModalChange visible={visible} onHide={() => setVisible(false)} />
      <ModalReuseClassroom visible={visibleReuse} onHide={() => setVisibleReuse(false)} classroom={classroom} />
    </ContentPage>
  );
};

export default ClassroomOne;
