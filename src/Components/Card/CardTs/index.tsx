import styles from "../../../Styles";
import { Column, Padding, Row } from "../../../Styles/styles";
import Icon from "../../Icon";
import IconClassroom from "./../../../Assets/images/ts_card.svg";
import { Container } from "./style";

const CardTs = ({
  title,
  id,
  onEdit,
  isAdmin,
}: {
  title: string;
  meetingCount?: number;
  registrationCount?: number;
  id: number;
  onEdit?: (id: number, title: string) => void;
  isAdmin?: boolean;
}) => {
  return (
    <Container className="card" onClick={() => {}}>
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
        {isAdmin && (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id, title);
            }}
          >
            <Icon icon="pi pi-pencil" color={styles.colors.colorGrayElephant} size="1rem" fontWeight="900" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CardTs;
