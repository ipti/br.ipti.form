import { useEffect, useState } from "react";
import { useFetchRequestSocialTechnologyLists } from "../../Services/SocialTechnology/query";
import { useFetchRequestUsersOne } from "../../Services/Users/query";
import { GetIdProject, GetIdTs, GetIdUser, idProject, idTs } from "../../Services/localstorage";
import { Projects, PropsForm } from "../../Types/types";
import { User } from "../Users/type";

const AplicationState = () => {
    const [form, setform] = useState<PropsForm>({ title: "Formulário Sem título", description: "", question: [] })
    const { data: projects } = useFetchRequestSocialTechnologyLists()

    const [project, setproject] = useState<Array<Projects> | undefined>()
    const [user, setuser] = useState<User | undefined>()


    const { data: userRequest } = useFetchRequestUsersOne(parseInt(GetIdUser()!))



    useEffect(() => {
        if (projects) {
            setproject(projects)

            if (!GetIdTs()) {
                idTs(projects[0]?.id?.toString())
            }


        }
        if (userRequest) {
            setuser(userRequest)
        }
    }, [projects, userRequest])

    return {
        form, setform, project, user
    }
}

export default AplicationState;