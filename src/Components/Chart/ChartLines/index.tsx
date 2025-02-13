import React from "react";
import { Chart as ChartPrime } from "primereact/chart";
import { ChartLinesModel } from "./chartLinesModel";

function ChartLines({
  chartLinesModel,
  type_chart,
}: {
  chartLinesModel: ChartLinesModel;
  type_chart: string;
}) {
  // Cria uma cópia do objeto chartLinesModel
  //   const chartData = {
  //     labels: [...chartLinesModel.labels],
  //     datasets: chartLinesModel.datasets.map(dataset => ({ ...dataset }))
  //   };

  return (
    <div>
      {/* {chartData && (
        <ChartPrime type={type_chart} data={chartData} />
      )} */}
    </div>
  );
}

export default ChartLines;
