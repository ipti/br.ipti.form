import styled from "styled-components";
import styles from "../../../Styles";

export const Container = styled.div`
  font-size: ${styles.typography.font.extraSmall};
  justify-content: space-between;
  cursor: pointer;

  border: 1.22px solid rgba(219, 230, 255, 1);
  background: ${styles.colors.colorCard};
  
  border-radius: 16px;

  .boxQuantity {
    display: flex;
    color: white;
    font-size: ${styles.typography.font.extraSmall};
  }

`;

interface StatusProps {
  color: string
}

export const StatusIcon = styled.div<StatusProps>`
   width: 100;
    height: 100;
    display: block;
    border-radius: 50%;
    right: 8px;
    bottom: 5px;
    position: absolute;
    background-color: ${props => props.color}
`;
