import { useEffect, useState } from "react";
import { useFetchRequestUsers } from "../../Services/Users/query";
import { ControllerUser } from "../../Services/Users/controller";
import { CreateUser } from "./type";

export const UsersState = () => {
  const [users, setusers] = useState<any>();
  const [role, setRole] = useState<string | undefined>()

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
      project: GetId(data.project)
    }
    props.requestUserMutation.mutate(body);
  };

  const UpdateUser = (data: CreateUser, id: number) => {
    const body = {
      name: data.name,
      username: data.username,
      role: data.role,
      project: GetId(data.project)
    }
    props.requestUpdateUserMutation.mutate({ data: body, id: id });
  };

  const DeleteUser = (id: number) => {
    props.requestDeleteUserMutation.mutate(id)
  }

  useEffect(() => {
    setRole("TODOS")
  }, [])

  useEffect(() => {
    if (userRequest) {
      setusers(userRequest);
    }
  }, [userRequest, role]);

  return { users, CreateUser, DeleteUser, UpdateUser, isLoading, role, setRole };
};
