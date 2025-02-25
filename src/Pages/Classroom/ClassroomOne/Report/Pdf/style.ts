import styled from "styled-components";
import styles from "../../../../../Styles";

export const Container = styled.div`
  font-family: ${styles.typography.types.inter};
  width: 100%;
  height: 100%;
  font-size: 3vh;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const Td = styled.td`
  border: 1px solid #ddd;

  padding: 8px;
`;
