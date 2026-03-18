import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import ContentPage from "../../Components/ContentPage";
import Loading from "../../Components/Loading";
import { formatarData, typeLog } from "../../Controller/controllerGlobal";
import { UserLogScope, useFetchUserLogs } from "../../Services/UserLog/query";
import { Padding } from "../../Styles/styles";

type UserLogsProps = {
  scope: UserLogScope;
  title: string;
  description: string;
  id: number;
};

const UserLogs = ({ scope, title, description, id }: UserLogsProps) => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  const { data, isLoading } = useFetchUserLogs(scope, String(id ?? ""), {
    page: String(page),
    limit: String(rows),
  });

  if (isLoading) return <Loading />;

  const logs = data?.content ?? data?.data ?? [];
  const totalRecords = data?.totalRecords ?? data?.total ?? logs.length;

  return (
    <ContentPage title={title} description={description}>
      <Padding padding="16px" />
      <DataTable
        value={logs}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        first={(page - 1) * rows}
        rows={rows}
        rowsPerPageOptions={[10, 20, 50]}
        totalRecords={totalRecords}
        onPage={(e) => {
          setPage((e.page ?? 0) + 1);
          setRows(e.rows ?? 10);
        }}
      >
        <Column field="users.name" header="Usuário" />
        <Column field="action" header="Ação" />
        <Column body={(row) => typeLog[row?.type]} header="Tipo" />
        <Column field="createdAt" header="Data" body={(row) => formatarData(row?.createdAt)} />
      </DataTable>
    </ContentPage>
  );
};

export default UserLogs;
