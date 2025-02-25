import { Nullable } from "primereact/ts-helpers";
import { ChartStatusState } from "./state";
import { Chart } from "primereact/chart";

export function ChartStatus({
  dates,
  ts,
}: {
  dates: Nullable<(Date | null)[]>;
  ts: number[] | undefined;
}) {
  const states = ChartStatusState({ dates: dates, ts: ts });
  const chartData = states.chartData;

  return (
    <div>
      {chartData && (
              <Chart
                type="bar"
                data={chartData}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            )}
    </div>
  );
}
