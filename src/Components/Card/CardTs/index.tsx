import { ConfirmDialog } from "primereact/confirmdialog";
import { useContext, useState } from "react";
import { ClassroomContext } from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { Column, Padding, Row } from "../../../Styles/styles";
import IconClassroom from "./../../../Assets/images/ts_card.svg";
import { Container } from "./style";



const CardTs = ({
  title,
  id,
}: {
  title: string;
  meetingCount?: number;
  registrationCount?: number,
  id: number;
}) => {
  const [visible, setVisible] = useState(false);

  const props = useContext(ClassroomContext) as ClassroomTypes;

  return (
    <>
      <Container className="card" onClick={() => { }}>
        <Row id="space-between">
          <Row >
            <div className={`boxQuantity`}>
              <img src={IconClassroom} alt="" style={{ height: 32 }} />
            </div>
            <Padding padding="4px" />
            <Column id="center">
              <h3>{title}</h3>
            </Column>
          </Row>
          {/* <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(true);
            }}
          >
            <Icon icon="pi pi-trash" color={styles.colors.colorGrayElephant} size="1rem" fontWeight="900" />
          </div> */}
        </Row>
        {/* < Padding padding="8px" />
        <Row style={{ gap: 16 }}>
          <Row style={{ gap: 8, alignItems: "center" }}>
            <img src={pessoas} alt="" style={{ width: 24 }} />
            <p>
              Alunos: {registrationCount}
            </p>
          </Row>
          <Row style={{ gap: 8, alignItems: "center" }}>
            <img src={meeting} alt="" style={{ width: 19 }} />
            <p>
              Encontros: {meetingCount}
            </p>
          </Row>
        </Row> */}
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

export default CardTs;
