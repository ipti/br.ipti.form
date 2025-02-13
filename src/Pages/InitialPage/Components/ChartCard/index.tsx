import React from "react";
import { Padding, Row } from "../../../../Styles/styles";
import { ChartStatus } from "../ChartStatus/chartStatus";
import { ChartMatriculated } from "../ChartMatrticulated/chartMatriculated";
import { Nullable } from "primereact/ts-helpers";

type ChartCardProps = {
  title: string;
  type: "line" | "bar" | undefined;
  dates: Nullable<(Date | null)[]>;
  ts: number[] | undefined;
};
export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  dates,
  ts,
}) => {
  return (
    <div
      className="card col-12 md:col-6 lg:col-6"
      style={{ padding: "20px", width: "49%" }}
    >
      <Row id="start">
        <h2>{title}</h2>
        <Padding padding="8px" />
      </Row>
      {type === "line" ? (
        <ChartMatriculated dates={dates} ts={ts} />
      ) : type === "bar" ? (
        <ChartStatus dates={dates} ts={ts} />
      ) : (
        <></>
      )}
    </div>
  );
};
