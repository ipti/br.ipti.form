import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useParams } from "react-router-dom";
import Present from "../../../../Assets/images/status-approved.svg";
import NotPresent from "../../../../Assets/images/status-desapproved.svg";
import { useFetchRequestClassroomReport } from "../../../../Services/Classroom/query";
import { Container, Row } from "../../../../Styles/styles";
import color from "../../../../Styles/colors";
import { ReportClassroom } from "./Pdf";
import ContentPage from "../../../../Components/ContentPage";

const Report = () => {
  return <ReportPage />;
};

const ReportPage = () => {
  const { id } = useParams();

  const { data } = useFetchRequestClassroomReport(parseInt(id!));

  const { generatePDF } = ReportClassroom();

  const bodyMeeting = (rowData: any, options: any) => {
    const verifyFouls = () => {
      const verify = data?.meeting[
        parseInt(options?.column.props.columnKey)
      ]?.fouls?.find(
        (props: any) => props.registration_fk === rowData.registration_fk
      );
      return verify;
    };
    return <img alt="" src={!verifyFouls() ? Present : NotPresent} />;
  };

  const bodyTotal = (rowData: any) => {
    const verifyFouls = () => {
      var count = 0;
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

    return (
      <div
        style={{
          background:
            data?.project?.approval_percentage < verifyFouls()
              ? color.green
              : color.red,
          padding: 4,
          borderRadius: 8,
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>
          {verifyFouls().toFixed(0)}%
        </h3>
      </div>
    );
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="danger"
        rounded
        onClick={generatePDF}
        data-pr-tooltip="PDF"
      />
    </div>
  );
  return (
    <ContentPage title="Relatório de Frequencia " description="Consulte ou gere um relatório pre presença dos alunos da sua turma.">
      <div id="center" style={{width: "90%", maxWidth: "95vw"}}>
      <DataTable
        value={data?.register_classroom}
        header={header}
        tableStyle={{ width: "50rem" }}
        >
        <Column field={"registration.name"} header={"Beneficiário"} />
        {data?.meeting?.map((item: any, index: number) => (
          <Column
            align={"center"}
            key={index}
            columnKey={index.toString()}
            body={bodyMeeting}
            header={item.name}
            />
          ))}
        <Column body={bodyTotal} header={"Total"} />
      </DataTable>
          </div>
    </ContentPage>
  );
};

export default Report;
