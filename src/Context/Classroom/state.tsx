import { useEffect, useState } from "react"
import { ControllerClassroom } from "../../Services/Classroom/controller"
import { useFetchRequestClassroom } from "../../Services/Classroom/query"
import { GetIdProject, idProject } from "../../Services/localstorage"
import { useFetchRequestTsLists } from "../../Services/Project/query"
import { Tsone } from "../Project/ProjectList/type"
import { ChangeClassroom, CreateClassroom } from "./type"

export const ClassroomState = () => {
    const initialValue = {
        name: ""
    }

    const [classrooms, setClassrooms] = useState<any>();
    const [project, setProject] = useState<number | undefined>()

    const { data: classroomsFetch, isLoading } = useFetchRequestClassroom(project!)

    const [tsOne, setTsOne] = useState<Tsone | undefined>();
    const { data: tsOneRequest } = useFetchRequestTsLists(undefined)

    useEffect(() => {
        if (tsOneRequest) {
            setTsOne(tsOneRequest)
            if (GetIdProject() && tsOneRequest?.project.find((item: any) => item.id === parseInt(GetIdProject() ?? "0"))) {
                setProject(parseInt(GetIdProject() ?? "0"))
            } else {
                setProject(tsOneRequest?.project[0]?.id)
                idProject(tsOneRequest?.project[0]?.id)
            }
        }
    }, [tsOneRequest])

    const { requestCreateClassroomMutation, requestChangeClassroomMutation, requestDeleteClassroomMutation, requestUpdateClassroomMutation } = ControllerClassroom()

    const UpdateClassroom = (body: { name: string, status: string }, id: number) => {
        requestUpdateClassroomMutation.mutate({ data: body, id: id })
    }


    useEffect(() => {
        if (classroomsFetch) {
            setClassrooms(classroomsFetch)
        }
    }, [classroomsFetch, project])


    const CreateClassroom = (body: CreateClassroom) => {
        requestCreateClassroomMutation.mutate(body)
    }

    const ChangeClassroom = (body: ChangeClassroom) => {
        requestChangeClassroomMutation.mutate(body)
    }

    const DeleteClassroom = (id: number) => {
        requestDeleteClassroomMutation.mutate(id)
    }

    return { initialValue, CreateClassroom, classrooms, UpdateClassroom, DeleteClassroom, isLoading, tsOne, project, setProject, ChangeClassroom }
}