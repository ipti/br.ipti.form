import styled from "styled-components";
import styles from "../../../Styles";

export const Container = styled.div`
  font-size: ${styles.typography.font.extraSmall};
  justify-content: space-between;
  cursor: pointer;

  border: 1.22px solid rgba(219, 230, 255, 1);
  background: ${styles.colors.colorCard};
  
  border-radius: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .boxQuantity {
    display: flex;
    color: white;
    font-size: ${styles.typography.font.extraSmall};
  }
  .boxYear {
    border-radius: 25px;
    background-color: ${styles.colors.green};
    width: 64px;
    height: 24px;
    text-align: center;
    color: white;
    padding: 9px, 16px, 9px, 16px;
  }
`;
