import { useEffect, useState } from "react";
import { requestChartMatriculated } from "../../../../Services/Chart/request";
import { Chart } from "./type";
import { getMonthNumber, month } from "../../../../Controller/controllerGlobal";
import color from "../../../../Styles/colors";
import { ChartLinesModel } from "../../../../Components/Chart/ChartLines/chartLinesModel";
import { Nullable } from "primereact/ts-helpers";

export const ChartMatriculatedState = ({
  dates,
  ts,
}: {
  dates: Nullable<(Date | null)[]>;
  ts: any;
}) => {
  const [chartData, setChartData] = useState<any>(null);

  const [, setFormattedDates] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

    const start = formatDate(dates[0]);
    const end = formatDate(dates[1]);

    setFormattedDates({ start, end });

    const fetchData = async () => {
      try {
        const response = await requestChartMatriculated(start, end, ts ?? []);

        const data: Chart[] = response.data;

        // Pegando apenas os meses disponíveis nos dados recebidos
        const availableMonths = Array.from(
          new Set(data.map((item) => item.month))
        ).sort((a, b) => a - b);

        const mesInital = dates[0]?.getMonth() ?? 0;
        const mesFinal = dates[1]?.getMonth() ?? 0;
        // Criando labels dinâmicos baseados nos meses retornados
        const labels = dates[0]
          ? getMonthNumber(mesInital, mesFinal)
          : availableMonths.map((m) => month[m]);

        const datasets = [
          {
            label: "Total de Matrículas Confirmadas",
            data: availableMonths.map((m) => {
              const found = data.find((element) => element.month === m);
              return found ? found.n_approved : 0;
            }),
            borderColor: color.blue,
            fill: false,
          },
          {
            label: "Total de Matrículas",
            data: availableMonths.map((m) => {
              const found = data.find((element) => element.month === m);
              return found ? found.n_registers : 0;
            }),
            borderColor: color.colorCardOrange,
            fill: false,
          },
        ];

        const updatedChartData = new ChartLinesModel(labels, datasets);

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchData();
  }, [dates, ts]);

  return { chartData };
};
