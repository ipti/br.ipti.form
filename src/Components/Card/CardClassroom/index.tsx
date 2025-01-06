import { ConfirmDialog } from "primereact/confirmdialog";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClassroomContext } from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { Column, Padding, Row } from "../../../Styles/styles";
import Icon from "../../Icon";
import IconClassroom from "./../../../Assets/images/cardturmas.svg";
import { Container } from "./style";

import pessoas from "../../../Assets/images/pessoasgray.svg";
import { AplicationContext } from "../../../Context/Aplication/context";
import { ROLE, Status } from "../../../Controller/controllerGlobal";
import { menuItem } from "../../../Services/localstorage";
import styles from "../../../Styles";
import { PropsAplicationContext } from "../../../Types/types";
import IconStatus from "./../../../Assets/images/published_with_changes.svg";


const CardClassroom = ({
  title,
  meetingCount,
  registrationCount,
  id,
  status
}: {
  title: string;
  meetingCount?: number;
  status?: string
  registrationCount?: number;
  id: number;
}) => {
  const history = useNavigate();
  const [visible, setVisible] = useState(false);

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const props = useContext(ClassroomContext) as ClassroomTypes;

  return (
    <>
      <Container
        className="card"
        onClick={() => {
          menuItem("4");
          history(`/turma/${id}`);
        }}
      >
        <Row id="space-between">
          <Row>
            <div className={`boxQuantity`}>
              <img src={IconClassroom} alt="" style={{ height: 32 }} />
            </div>
            <Padding padding="4px" />
            <Column id="center">
              <h3>{title}</h3>
            </Column>
          </Row>
          {(propsAplication.user?.role === ROLE.ADMIN ||
            propsAplication.user?.role === ROLE.COORDINATORS) && (
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(true);
                }}
              >
                <Icon
                  icon="pi pi-trash"
                  color={styles.colors.colorGrayElephant}
                  size="1rem"
                  fontWeight="900"
                />
              </div>
            )}
        </Row>
        <Padding padding="8px" />
        <Row style={{ gap: 16 }}>
          <Row style={{ gap: 8, alignItems: "center" }}>
            <img src={pessoas} alt="" style={{ width: 24 }} />
            <p style={{fontSize: "10px"}}>Participantes: {registrationCount}</p>
          </Row>
          <Column id="center">
            <Row>
              <img
                src={IconStatus}
                alt=""
                style={{ height: 16, marginRight: 2 }}
              />
              <Row style={{ fontSize: "10px" }}>
                Status: {" "}<Padding padding="2px" />
                {status === Status.PENDING ? (
                  <p style={{ fontWeight: "600" }}> Pendente</p>
                ) : status === Status.APPROVED ? (
                  <p style={{ fontWeight: "600" }}> Finalizado</p>
                ) : status === Status.REPROVED ? (
                  <p style={{ fontWeight: "600" }}> Reprovado</p>
                ) : null}
              </Row>
            </Row>
          </Column>
        </Row>
      </Container>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => props.DeleteClassroom(id)}
        reject={() => setVisible(false)}
      />
    </>
  );
};

export default CardClassroom;
