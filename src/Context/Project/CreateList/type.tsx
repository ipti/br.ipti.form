export interface CreateProjectTypes {
    CreateProject: (body: CreateProject) => void
}


export interface CreateProject {
    name: string,
    approval_percentage: number,
    socialTechnologyId: number
}

export interface UpdateProject {
    name: string,
    approval_percentage: number,
}