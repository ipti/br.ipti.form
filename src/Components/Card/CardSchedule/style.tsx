import styled from "styled-components";
import styles from "../../../Styles";

export const Container = styled.div`
  color: ${styles.colors.grayClear};
  font-size: ${styles.typography.font.extraSmall};
  justify-content: space-between;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .boxQuantity {
    display: flex;
    color: white;
    font-size: ${styles.typography.font.extraSmall};
  }
`;
