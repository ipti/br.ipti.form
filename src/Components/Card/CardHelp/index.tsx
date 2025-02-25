import styled from "styled-components";
import styles from "../../../Styles";
import { Column, Row } from "../../../Styles/styles";

const NumberCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 8px;
  border-radius: 8px;
  max-height: 42px;
  min-height: 42px;
  min-width: 42px;
  max-width: 42px;
  font-family: ${styles.typography.types.inter};
  font-weight: 700;
  font-size: ${styles.typography.font.extraMedium};
  background-color: ${styles.colors.colorsBaseProductNormal};
`;

const CardHelp = ({
  title,
  description,
  link,
  index,
}: {
  title: string;
  description?: string;
  link?: string;
  index: number;
}) => {
  return (
    <div
      style={{ backgroundColor: styles.colors.colorCard, cursor: "pointer", padding: 24, border: "1.22px solid rgba(219, 230, 255, 1)" }}
      className="card"
      onClick={() => window.open(link)}
    >
      <Row style={{ gap: "20px" }}>
        <Column id="center">
        <NumberCard>{index.toString().padStart(2, "0")}</NumberCard>
        </Column>
        <Column id="center">
          <h3 style={{fontFamily: styles.typography.types.inter, fontSize: styles.typography.font.medium, fontWeight: "700"}}>{title}</h3>
        </Column>
      </Row>
      <p>{description}</p>
    </div>
  );
};

export default CardHelp;
