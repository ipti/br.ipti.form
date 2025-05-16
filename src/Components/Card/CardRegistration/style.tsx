import styled from "styled-components";
import styles from "../../../Styles";

export const Container = styled.div`
  font-size: ${styles.typography.font.extraSmall};
  justify-content: space-between;
  cursor: pointer;

  border: 1.22px solid rgba(219, 230, 255, 1);
  background: ${styles.colors.colorCard};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: -16px;
  
  border-radius: 16px;

  .boxQuantity {
    display: flex;
    color: white;
    font-size: ${styles.typography.font.extraSmall};
  }

  .status {
    display: inline-block; /* Permite que a largura seja ajustada pelo conteúdo */
      padding: 10px; /* Espaçamento interno */
      border: 1px solid #ccc; /* Borda para destacar o div */
      min-width: 150px; /* Largura mínima */
      max-width: 300px; /* Largura máxima */
      word-wrap: break-word; /* Quebra o texto se ele ultrapassar a largura máxima */
      text-align: center;
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
