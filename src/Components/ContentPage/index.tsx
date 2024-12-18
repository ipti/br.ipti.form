import { MouseEventHandler, ReactNode } from "react";
import { Column, Container, Padding, Row } from "../../Styles/styles";
import { Button } from "primereact/button";

const ContentPage = ({
  description,
  title,
  children,
  addButton,
  onClick, labelButton,
  permissionButton
}: {
  title: string;
  description: string;
  children: ReactNode;
  addButton?: boolean,
  permissionButton?: boolean,
  labelButton?: string,
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  return (
    <Container>
      <Row id="space-between">
        <Column>
          <h1>{title}</h1>
          <Padding padding="4px" />
          <p>{description}</p>
        </Column>
        <Column id="center">
        {(addButton && permissionButton) && <Button style={{height: "42px"}} label={labelButton ?? "Adicionar"} onClick={onClick} icon={"pi pi-plus"} />}
        </Column>
      </Row>
      <Padding padding="4px" />

      {children}
    </Container>
  );
};

export default ContentPage;
