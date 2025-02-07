import { Nullable } from "primereact/ts-helpers";
import { ChartMatriculatedState } from "./state";
import { Chart } from "primereact/chart";

export function ChartMatriculated({
  dates,
  ts,
}: {
  dates: Nullable<(Date | null)[]>;
  ts: number[] | undefined;
}) {
  const states = ChartMatriculatedState({ dates: dates, ts: ts });

  return (
    <div>
      {states.chartData && <Chart type="line" data={states.chartData} />}
    </div>
  );
}
