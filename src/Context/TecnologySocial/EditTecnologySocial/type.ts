export type EditTsTypes = {
  EditTechnology: (params: { stId: number; body: { name: string; area_of_activity?: string } }) => void;
  loading: boolean;
};
