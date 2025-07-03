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
import { convertImageUrlToBase64, formatarDataAnoDuas, loadImageFileAsBase64 } from "../../../../../Controller/controllerGlobal";

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

  const uniqueUsersMap = new Map();

report?.meeting?.forEach((meeting: any) => {
  meeting?.meeting_user?.forEach((entry: any) => {
    const user = entry.users;
    if (!uniqueUsersMap.has(user.id)) {
      uniqueUsersMap.set(user.id, user);
    }
  });
});

const uniqueUsers = Array.from(uniqueUsersMap.values());


  const generatePDF = () => {
    const maxMeetingsPerPage = 12;
    const maxStudentsPerPage = 25;
  
    const createTableBody = (registrationsSubset: any, meetingSubset: any, startIndex: number) => {
            
      const headerRow = [
        "Nº",
        "NOME COMPLETO",
        ...meetingSubset.map((item: any, index: number) => formatarDataAnoDuas(item.meeting_date)),
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
        fontSize: 10,
      },
      {
        text: "Relatório de Presença",
        style: "header",
        alignment: "center",
        fontSize: 8,
        marginTop: 4,
      },
      {
        style: "tableExample",
        marginTop: 4,
        fontSize: 6,
        table: {
          widths: ["*", "*"],
          body: [[`Reaplicador: ${uniqueUsers?.map(e =>{ return e.name + "; "} )}`, `Turma: ${report?.name}`]],
        },
      },
      ...studentPages.flatMap((studentSubset, studentPageIndex) => 
        meetingPages.map((meetingSubset, meetingPageIndex) => [
          {
            style: "tableExample",
            marginTop: 8,
            fontSize: 6,
            table: {
              widths: [
                "3%",
                "20%",
                ...meetingSubset!.map(() => "*"),
                "6%",
                "5%",
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
            marginTop: 8,
            fontSize: 6,
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
          fontSize: 12,
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
