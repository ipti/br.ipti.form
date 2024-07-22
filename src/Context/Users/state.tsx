import { useEffect, useState } from "react";
import { useFetchRequestUsers } from "../../Services/Users/query";
import { ControllerUser } from "../../Services/Users/controller";
import { CreateUser } from "./type";
import { converterData } from "../../Controller/controllerGlobal";

export const UsersState = () => {
  const [users, setusers] = useState<any>();
  const [role, setRole] = useState<string | undefined>("TODOS")

  const { data: userRequest, isLoading } = useFetchRequestUsers(role);

  const props = ControllerUser();

  const GetId = (data: any) => {
    const array = [];
    for (const project of data) {
      array.push(project.id);
    }

    return array;
  };

  const CreateUser = (data: CreateUser) => {
    const body = {
      name: data.name,
      username: data.username,
      password: data.password,
      role: data.role,
      project: GetId(data.project),
      sex: data.sex,
      color_race: data.color_race,
      birthday: converterData(data.birthday),
      email: data.email,
      initial_date: converterData(data.initial_date),
      phone: data.phone,
    };
    props.requestUserMutation.mutate(body);
  };

  const UpdateUser = (data: CreateUser, id: number) => {
    const body = {
      name: data.name,
      username: data.username,
      role: data.role,
      project: GetId(data.project),
      sex: data.sex,
      color_race: data.color_race,
      birthday: converterData(data.birthday),
      email: data.email,
      initial_date: converterData(data.initial_date),
      phone: data.phone,
    };
    props.requestUpdateUserMutation.mutate({ data: body, id: id });
  };

  const ChangePassword = (data: {password: string}, id: number) => {
   
    props.requestPasswordMutation.mutate({ data: data, id: id });
  };

  const DeleteUser = (id: number) => {
    props.requestDeleteUserMutation.mutate(id);
  };
  useEffect(() => {
    if (userRequest) {
      setusers(userRequest);
    }
  }, [userRequest, role]);

  return { users, CreateUser, DeleteUser, UpdateUser, isLoading, role, setRole, ChangePassword };
};
