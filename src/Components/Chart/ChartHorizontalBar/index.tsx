import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
//import { subtractMonths, formatDate, getMonthNumber } from "../utils/dateUtils";
import { requestChartMatriculated } from "../../../Services/Chart/request";

interface ChartComponentProps {
  title: string;
  color1: string;
  color2: string;
  ts?: number[];
}

const ChartComponent = ({ title, color1, color2, ts }: ChartComponentProps) => {
  const [dates, setDates] = useState<[Date, Date]>([subtractMonths(new Date(), 6), new Date()]);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        
        const start = formatDate(dates[0]);
        const end = formatDate(dates[1]);
        const response = await requestChartMatriculated(start, end, ts ?? []);

        const data = response.data;
        const availableMonths = Array.from(new Set(data.map((item) => item.month))).sort((a, b) => a - b);
        const labels = getMonthNumber(dates[0].getMonth(), dates[1].getMonth());
  
        setChartData({
          labels,
          datasets: [
            {
              label: "Total Confirmado",
              data: availableMonths.map((m) => data.find((el) => el.month === m)?.n_approved || 0),
              borderColor: color1,
              fill: false,
            },
            {
              label: "Total Registrado",
              data: availableMonths.map((m) => data.find((el) => el.month === m)?.n_registers || 0),
              borderColor: color2,
              fill: false,
            },
          ],
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dates, ts]);

  return (
    <div className="card col-12 md:col-6 lg:col-6" style={{ padding: "20px" }}>
      <h2>{title}</h2>
      {isLoading ? (
        <p>Carregando...</p>
      ) : isError ? (
        <p>Erro ao carregar os dados</p>
      ) : (
        chartData && <Chart type="line" data={chartData} />
      )}
    </div>
  );
};

export default ChartComponent;
