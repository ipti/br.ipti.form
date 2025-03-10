import { ConfirmDialog } from "primereact/confirmdialog";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../../../Assets/images/avatar.svg";
import { RegistrationClassroomContext } from "../../../Context/Classroom/RegistrationsList/context";
import { RegistrationClassroomTypes } from "../../../Context/Classroom/RegistrationsList/type";
import { ROLE, Status, StatusEnum } from "../../../Controller/controllerGlobal";
import { Column, Padding, Row } from "../../../Styles/styles";
import Icon from "../../Icon";
import { Container } from "./style";
import { AplicationContext } from "../../../Context/Aplication/context";
import { PropsAplicationContext } from "../../../Types/types";
import color from "../../../Styles/colors";

const CardRegistration = ({
  title,
  subtitle,
  idRegistration,
  status,
  avatar_url,
}: {
  title: string;
  subtitle: string;
  idRegistration: number;
  status: string;
  avatar_url: string;
}) => {
  const [visible, setVisible] = useState(false);
  const history = useNavigate();

  const statuGlobal = Status;

  const { id } = useParams();

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const props = useContext(
    RegistrationClassroomContext
  ) as RegistrationClassroomTypes;

  return (
    <>
      <Container
        className="card"
        onClick={(e) => {
          e.stopPropagation();
          if (
            propsAplication.user?.role === ROLE.ADMIN ||
            propsAplication.user?.role === ROLE.COORDINATORS
          ) {
            history(`/turma/${id}/aluno/${idRegistration}`);
          }
        }}
      >
        <Row id="end">
          {(propsAplication.user?.role === ROLE.ADMIN ||
            propsAplication.user?.role === ROLE.COORDINATORS) && (
            <div
              className="cursor-pointer"
              style={{ marginBottom: "-32px" }}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
            >
              <Icon icon="pi pi-trash" size="1rem" />
            </div>
          )}
        </Row>
        <Padding padding="8px" />
        <Row>
          <div className={`boxQuantity`}>
            <Column id="center">
              <img
                src={avatar_url ?? avatar}
                alt=""
                style={{ height: 72, width: 72, borderRadius: "50%" }}
              />
            </Column>
          </div>
          <Padding />
          <Column>
            <div
              className="status"
              style={{
                fontWeight: "500",
                padding: 4,
                textAlign: "center",
                minWidth: "96px",
                maxWidth: "150px",
                color: "white",
                borderRadius: "16px",
                backgroundColor: `${
                  status === statuGlobal.APPROVED
                    ? color.green
                    : status === statuGlobal.PENDING
                    ? color.colorCardOrange
                    : status === statuGlobal.REPROVED
                    ? color.red
                    : color.colorCardOrange
                }`,
              }}
            >
              {StatusEnum[status] ? StatusEnum[status] : StatusEnum["PENDING"]}
            </div>
            <Padding />
            <h4>{subtitle}</h4>
            <Padding />

            <div className={"boxDescriptionSchedule"}>
              {"Matricula - " + title}
            </div>
          </Column>
        </Row>
      </Container>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => props.DeleteRegistration(idRegistration)}
        reject={() => setVisible(false)}
      />
    </>
  );
};

export default CardRegistration;
