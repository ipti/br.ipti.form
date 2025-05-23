import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../../../../../Assets/images/logothp.png";
import { useFetchRequestClassroomReport } from "../../../../../Services/Classroom/query";
import {
  RegisterClassroom,
  ReportClassroomType,
} from "../../../../../Services/Classroom/type";

import imgLateral from "../../../../../Assets/images/logoleftpdf.png";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { convertImageUrlToBase64, loadImageFileAsBase64 } from "../../../../../Controller/controllerGlobal";

pdfMake.vfs = pdfFonts.vfs;
export const ReportClassroom = () => {
  const { id } = useParams();

  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [logoBaseLeft64, setLogoBaseLeft64] = useState<string | null>(null);
  const [logoBaseRegua64, setLogoBaseRegua64] = useState<string | null>(null);

  const [report, setReport] = useState<ReportClassroomType | undefined>();

  const { data } = useFetchRequestClassroomReport(parseInt(id!));

  useEffect(() => {
    if (data) {
      setReport(data);
    }
  }, [data]);

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
        if (report?.project.ruler_url) {
          const base64 = await convertImageUrlToBase64(report?.project.ruler_url);

          setLogoBaseRegua64(base64);
        }

      } catch (error) {
        console.error("Error loading logo image:", error);
      }
    };

    loadLogo();
  }, [report]);



  const bodyMeeting = (rowData: any, meeting: any) => {
    const verifyFouls = () => {
      const verify = meeting.fouls?.find(
        (props: any) => props.registration_fk === rowData.registration_fk
      );
      return verify;
    };
    return !verifyFouls() ? "P" : "F";
  };

  function abreviarNomeDinamico(texto: string): string {
  return texto
    .split("-")
    .map(parte => {
      return parte
        .trim()
        .split(" ")
        .map(palavra => {
          if (!isNaN(Number(palavra))) return palavra;
          return palavra.charAt(0).toUpperCase();
        })
        .join("");
    })
    .join(" - ");
}


  const generatePDF = () => {
    const maxMeetingsPerPage = 7;
    const maxStudentsPerPage = 7;
  
    const createTableBody = (registrationsSubset: any, meetingSubset: any, startIndex: number) => {
      
      
      const headerRow = [
        "Nº",
        "NOME COMPLETO",
        ...meetingSubset.map((item: any, index: number) => meetingSubset.length > 4 ?  abreviarNomeDinamico(item.name) : item.name.substring(0,20)),
        "FREQUÊNCIA",
        "STATUS",
      ];
  
      const bodyRows = registrationsSubset.map((item: any, index: number) => {
        return [
          startIndex + index + 1,
          item.registration.name + " - " + item.registration.cpf,
          ...meetingSubset.map((meeting: any) => bodyMeeting(item, meeting)),
          bodyTotal(item).percentage + "%",
          parseInt(bodyTotal(item).percentage) > report?.project?.approval_percentage! ? "Aprovado" : "Reprovado",
        ];
      });
  
      return [headerRow, ...bodyRows];
    };
  
    const splitMeetingsIntoPages = () => {
      const meetingPages = [];
      const totalMeetings = report?.meeting.length || 0;
  
      for (let i = 0; i < totalMeetings; i += maxMeetingsPerPage) {
        meetingPages.push(report?.meeting.slice(i, i + maxMeetingsPerPage));
      }
  
      return meetingPages;
    };
  
    const splitStudentsIntoPages = () => {
      const studentPages = [];
      const totalStudents = report?.register_classroom.length || 0;
  
      for (let i = 0; i < totalStudents; i += maxStudentsPerPage) {
        studentPages.push(report?.register_classroom.slice(i, i + maxStudentsPerPage));
      }
  
      return studentPages;
    };
  
    const meetingPages = splitMeetingsIntoPages();
    const studentPages = splitStudentsIntoPages();
  
    const content:any[] = [
      {
        text: `${report?.project.social_technology.name}`,
        style: "header",
        alignment: "center",
        bold: true,
        marginTop: -32,
      },
      {
        text: `${report?.project.name}`,
        style: "header",
        alignment: "center",
        fontSize: 14,
      },
      {
        text: "Relatório de Presença",
        style: "header",
        alignment: "center",
        fontSize: 12,
        marginTop: 16,
      },
      {
        style: "tableExample",
        marginTop: 16,
        table: {
          widths: ["*", "*"],
          body: [["Filiação: ", `Turma: ${report?.name}`]],
        },
      },
      ...studentPages.flatMap((studentSubset, studentPageIndex) => 
        meetingPages.map((meetingSubset, meetingPageIndex) => [
          {
            style: "tableExample",
            marginTop: 32,
            table: {
              widths: [
                "4%",
                "30%",
                ...meetingSubset!.map(() => "*"),
                "11%",
                "10%",
              ],
              body: createTableBody(
                studentSubset || [], 
                meetingSubset, 
                studentPageIndex * maxStudentsPerPage 
              ),
            },
            pageBreak: studentPageIndex === 0 && meetingPageIndex === 0 ? undefined : "before",
          },
          {
            style: "tableExample",
            marginTop: 16,
            table: {
              widths: ["*"],
              body: [
                [
                  `Critério Mínimo de Aprovação: ${report?.project?.approval_percentage}%    Quantidade de Encontros: ${report?.meeting.length}    Quantidade de Alunos: ${report?.register_classroom?.length}`,
                ],
              ],
            },
          },
        ])
      ),
    ];
  
    const docDefinition: TDocumentDefinitions = {
      pageOrientation: "landscape",
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
      header: (currentPage, pageCount) => {
        return logoBase64
          ? {
              image: logoBase64 || "",
              alignment: "center",
              marginTop: 32,
              marginBottom: 128,
              fit: [400, 400],
            }
          : {
              image: logoBase64 || "",
              alignment: "center",
              marginTop: 32,
            marginBottom: 128,
              fit: [400, 400],
            };
      },
      footer: (currentPage, pageCount) => {
        return logoBaseRegua64
          ? {
              image: logoBaseRegua64 || "",
              alignment: "center",
              margin: [0, 0, 20, 20],
              fit: [400, 400],
            }
          : {
              image: logoBase64 || "",
              alignment: "center",
              margin: [0, 0, 20, 20],
              fit: [400, 400],
            };
      },
      pageMargins: [40, 100, 40, 60],
      background: (currentPage, pageCount) => {
        if (currentPage > 1) {
          return [
            {
              text: `${report?.project.social_technology.name}`,
              fontSize: 10,
              italics: true,
              alignment: "right",
              opacity: 0.5,
              margin: [0, 10, 10, 0], // Adjust the margins as needed
            },
            {
              text: `${report?.project.name}`,
              fontSize: 10,
              italics: true,
              alignment: "right",
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
          image: logoBaseLeft64 || "",
          width: 16,
          absolutePosition: { x: 8, y: 360 },
        };
      },
    };
  
    pdfMake.createPdf(docDefinition).open();
  };
  
  
  
  
  


  const bodyTotal = (rowData: RegisterClassroom) => {
    var count = 0;
    const verifyFouls = () => {
      for (const meeting of data?.meeting) {
        const verify = meeting?.fouls?.find(
          (props: any) => props.registration_fk === rowData.registration_fk
        );

        if (verify) {
          count++;
        }
      }

      return data.meeting.length !== 0
        ? ((data.meeting.length - count) / data.meeting.length) * 100
        : 0;
    };
    return { percentage: verifyFouls().toFixed(0), count: count };
  };

  return { generatePDF };


  
};
