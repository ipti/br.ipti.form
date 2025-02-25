export class ChartLinesModel {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
    }[];

    constructor(labels: string[], datasets: { label: string; data: number[]; borderColor: string; fill: boolean; }[]) {
        this.labels = labels;
        this.datasets = datasets;
    }
}