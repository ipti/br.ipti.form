import { useEffect, useState } from "react";
import { requestChartStatusClasses } from "../../../../Services/Chart/request";
import color from "../../../../Styles/colors";
import { ChartStatus } from "./type";
import { Nullable } from "primereact/ts-helpers";

export const ChartStatusState = ({ dates,
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
            const response = await requestChartStatusClasses(start, end, ts ?? []);
            const data: ChartStatus[] = response.data;
            const updatedChartData = {
              labels: data.map((item) => item.social_technology_name),
              datasets: [
                {
                  label: "Em andamento",
                  data: data.map((item) => item.t_pending),
                  backgroundColor: color.colorCardOrange,
                },
                {
                  label: "Finalizado",
                  data: data.map((item) => item.t_approved),
                  backgroundColor: color.blue,
                },
                {
                  label: "Cancelado",
                  data: data.map((item) => item.t_canceled),
                  backgroundColor: color.red,
                },
              ],
            };
            setChartData(updatedChartData);
          } catch (error) {
            console.error("Erro ao buscar dados do gráfico de status das turmas", error);
          }
        };
    
        fetchData();
      }, [dates, ts]);
      
    return { chartData };
  };