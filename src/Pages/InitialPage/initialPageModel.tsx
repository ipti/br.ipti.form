export class InitialPageModel {
  cardsData: {
    totalMeetings: number;
    approvedRegisterClassrooms: number;
    totalRegisterClassrooms: number;
    totalClassrooms: number;
    totalProjects: number;
    totalUserSocialTechnologies: number;
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
    
  ) {
    this.cardsData = cardsData;
  }
}
