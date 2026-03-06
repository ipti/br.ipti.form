export type EditTsTypes = {
  EditTechnology: (params: { stId: number; body: { name: string } }) => void;
  loading: boolean;
};
