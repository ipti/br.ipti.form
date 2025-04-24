import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import imgRegua from "../../../../../../Assets/images/logoleftpdf.png";

import imgLateral from "../../../../../../Assets/images/logoleftpdf.png";
import img from "../../../../../../Assets/images/logothp.png";
import Present from "../../../../../../Assets/images/status-approved.svg";
import NotPresent from "../../../../../../Assets/images/status-desapproved.svg";
import { MeetingListRegistrationContext } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/context";
import {
  MeetingListRegisterTypes,
  RegisterClassroom,
} from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/type";
import {
  Status,
  convertImageUrlToBase64,
  loadImageFileAsBase64
} from "../../../../../../Controller/controllerGlobal";
import styles from "../../../../../../Styles";
import { Padding, Row } from "../../../../../../Styles/styles";
pdfMake.vfs = pdfFonts.vfs;

const StyleComponent = styled.div`
  .p-datatable .p-datatable-tbody > tr > td {
    font-weight: 500;
    color: ${styles.colors.colorsBaseInkNormalActive};
  }
`;

const Beneficiarios = () => {
  const props = useContext(
    MeetingListRegistrationContext
  ) as MeetingListRegisterTypes;

  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [logoBaseLeft64, setLogoBaseLeft64] = useState<string | null>(null);
  const [logoBaseRegua64, setLogoBaseRegua64] = useState<string | null>(null);


  const FilterRegistration = (fouls: any) => {
    const array: any = [];
    for (const foul of fouls) {
      if (!array!.find((props: any) => props === foul.id)) {
        array.push(foul.registration);
      }
    }
    return array;
  };

  const [selectedProducts, setSelectedProducts] = useState<any>(
    FilterRegistration(props.meeting?.fouls)
  );
  const [rowClick] = useState(true);
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const base64 = await loadImageFileAsBase64(img);
        setLogoBase64(base64);
      } catch (error) {
        console.error("Error loading logo image:", error);
      }
    };

    loadLogo();
  }, []);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const base64 = await loadImageFileAsBase64(imgLateral);
        setLogoBaseLeft64(base64);
      } catch (error) {
        console.error("Error loading logo image:", error);
      }
    };

    loadLogo();
  }, []);


  useEffect(() => {
    const loadLogo = async () => {
      try {
        if (props.meeting?.classroom.project.ruler_url) {
          const base64 = await convertImageUrlToBase64(props.meeting?.classroom.project.ruler_url);

          setLogoBaseRegua64(base64);
        }

      } catch (error) {
        console.error("Error loading logo image:", error);
      }
    };

    loadLogo();
  }, [props.meeting]);

  const FilterId = (fouls: any) => {
    const array: any = [];
    for (const foul of fouls) {
      if (!array!.find((props: any) => props === foul.id))
        array.push(foul.id);
    }

    return array;
  };


  const bodyRegisterFouls = (dataRow: RegisterClassroom) => {
    return (
      <Row id="center">
        {!selectedProducts.find(
          (props: any) => props.id === dataRow.registration.id
        ) ? (
          <img
            alt=""
            style={{ cursor: "pointer" }}
            src={Present}
            onClick={() => {
              setSelectedProducts((prevArray: any) =>
                prevArray.concat(dataRow.registration)
              );
            }}
          />
        ) : (
          <img
            alt=""
            style={{ cursor: "pointer" }}
            src={NotPresent}
            onClick={() => {
              const novoArray = selectedProducts.filter(
                (obj: any) => obj.id !== dataRow.registration.id
              );
              setSelectedProducts(novoArray);
            }}
          />
        )}
      </Row>
    );
  };
  const generatePDF = () => {
    const registrations = props.meeting?.classroom.register_classroom || [];
    const pageSize = 20;

    const createTableBody = (registrationsSubset: any, startIndex: any) => {
      return [
        ["Nº ", "NOME COMPLETO", "CPF", "ASSINATURA"],
        ...registrationsSubset.map((item: any, index: number) => {
          return [startIndex + index + 1, item.registration.name, item.registration.cpf ? item.registration.cpf : "", ""];
        }),
      ];
    };

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: `${props.meeting?.classroom.project.name}`,
          style: "header",
          alignment: "center",
          bold: true,
          marginTop: 16,
        },
        {
          text: `${props.meeting?.name}`,
          style: "subheader",
          alignment: "center",
          fontSize: 14,
        },
        {
          text: "Lista de Presença",
          style: "subheader",
          alignment: "center",
          fontSize: 12,
          marginTop: 32,
        },
        {
          style: "tableExample",
          marginTop: 16,
          table: {
            widths: ["*", "*"],
            body: [["Data: ", `Turma: ${props.meeting?.classroom?.name}`]],
          },
        },
        ...registrations.reduce((acc: any, curr, index) => {
          if (index % pageSize === 0) {
            acc.push({
              style: "tableExample",
              marginTop: 16,
              table: {
                widths: ["3%", "40%", "15%", "42%"],
                body: createTableBody(
                  registrations.slice(index, index + pageSize),
                  index
                ),
              },

              pageBreak: index === 0 ? undefined : "before",
            });
          }
          return acc;
        }, []),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 10
        },
      },
      header: (currentPage: number, pageCount: number) => {
        return [
          {
            image: logoBase64 || "",
            width: 480,
            alignment: "center",
            marginTop: 32,
            marginBottom: 128,
          },
          {
            text: `${props.meeting?.classroom.project.name}`,
            style: "header",
            alignment: "center",
            bold: true,
            marginTop: 16,
          },
          {
            text: `${props.meeting?.name}`,
            style: "subheader",
            alignment: "center",
            fontSize: 14,
          },
          {
            text: "Lista de Presença",
            style: "subheader",
            alignment: "center",
            fontSize: 12,
            marginTop: 32,
          },
        ];
      },
      // footer: (currentPage: number, pageCount: number) => {
      //   return {
      //     columns: [
      //       {
      //         width: '*',
      //         text: '' // empty column to center the image
      //       },
      //       {
      //         image: logoBaseLeft64 || "",
      //         width: 400,
      //         alignment: "center",
      //       },
      //       {
      //         width: '*',
      //         height: 16,
      //         text: '' // empty column to center the image
      //       }
      //     ],
      //     margin: [0, 0, 0, 64],
      //     alignment: 'center'
      //   };
      // },
      footer: (currentPage, pageCount) => {
        return logoBaseRegua64 ? {
          image: logoBaseRegua64 || '',
          alignment: "center",
          margin: [0, 0, 20, 20],
          fit: [400, 400]
        } : {
          image: logoBase64 || '',
          alignment: "center",
          margin: [0, 0, 20, 20],
          fit: [400, 400]
        }
      },
      pageMargins: [40, 100, 40, 60],
      background: (currentPage, pageCount) => {
        if (currentPage > 1) {
          return [
            {
              text: `${props.meeting?.classroom.project.name}`,
              fontSize: 10,
              italics: true,
              alignment: "center",
              opacity: 0.5,
              margin: [0, 32, 10, 0], // Adjust the margins as needed
            },
            {
              text: `${props.meeting?.name}`,
              fontSize: 10,
              italics: true,
              alignment: "center",
              opacity: 0.5,
              margin: [0, 10, 10, 0], // Adjust the margins as needed
            },
            {
              image: logoBaseLeft64 || "",
              width: 16,
              absolutePosition: { x: 8, y: 360 },
            }
          ];
        }
        return {
          image: logoBaseLeft64 || '',
          width: 16,
          absolutePosition: { x: 8, y: 600 }
        };
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <div className="card">
      <h3>Lista de presença</h3>
      <Padding padding="16px" />
      <Row id="space-between">
        <Button
          label="Salvar"
          icon="pi pi-save"
          tooltip={(props.meeting?.meeting_archives?.length! === 0 ||
            props.meeting?.status === Status.APPROVED) ? "Para conseguir salvar a lista, é necessario adicionar um arquivo como uma evidencia da aula" : "Salvar as faltas do encontro"}
          tooltipOptions={{ disabled: true }}
          onClick={() => {
            props.CreateFouls({
              meeting: props.meeting?.id!,
              registration: FilterId(selectedProducts),
            });

          }}
        />
        <Button
          label={window.innerWidth > 600 ? "Gerar Lista de presença" : ""}
          icon="pi pi-download"
          onClick={generatePDF}
        />
      </Row>
      <Padding padding="16px" />
      <StyleComponent>
        {props.meeting?.classroom.register_classroom ? (
          <DataTable
            value={props.meeting?.classroom.register_classroom}
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedProducts}
            onSelectionChange={(e: any) => setSelectedProducts(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="Não há alunos registrados"
          >
            <Column
              field="registration.name"
              align="center"
              header="Nome"
            ></Column>
            <Column
              body={(row) => <>{row.registration.cpf ?? ""}</>}
              align={"center"}
              header="CPF"
            >
            </Column>
            <Column
              body={bodyRegisterFouls}
              align="center"
              header="Presença"
            ></Column>
          </DataTable>
        ) : null}
      </StyleComponent>
    </div>
  );
};

export default Beneficiarios;
