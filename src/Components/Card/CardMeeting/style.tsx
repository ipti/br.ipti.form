import styled from "styled-components";
import styles from "../../../Styles";

export const Container = styled.div`
  justify-content: space-between;
  cursor: pointer;

  border: 1.22px solid rgba(219, 230, 255, 1);
  background: ${styles.colors.colorCard};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  border-radius: 16px;

  .boxQuantity {
    display: flex;
    color: white;
  }

  p {
    font-weight: 400;
    font-size: 4;
  }
  .boxYear {
    border-radius: 25px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
