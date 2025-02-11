export class InitialPageModel {
  cardsData: {
    name: string;
    quant: number;
  }[];

  matriculatedData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  };

  constructor(
    cardsData: {
      name: string;
      quant: number;
    }[],
    matriculatedData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: boolean;
      }[];
    }
  ) {
    this.cardsData = cardsData;
    this.matriculatedData = matriculatedData;
  }
}
