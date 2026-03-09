
export interface CreateTsTypes {
    CreateTechnology: (body: {
        name: string;
        area_of_activity?: string;
    }) => void;
}