export class InitialPageModel {
  cardsData: {
    totalMeetings: number;
    approvedRegisterClassrooms: number;
    totalRegisterClassrooms: number;
    totalClassrooms: number;
    totalProjects: number;
    totalUserSocialTechnologies: number;
  };

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
      totalMeetings: number;
      approvedRegisterClassrooms: number;
      totalRegisterClassrooms: number;
      totalClassrooms: number;
      totalProjects: number;
      totalUserSocialTechnologies: number;
    },
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
