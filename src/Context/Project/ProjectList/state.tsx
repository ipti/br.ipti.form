import { useEffect, useState } from "react";
import { useFetchRequestTsLists } from "../../../Services/Project/query";
import { Tsone } from "./type";

export const ProjectListState = () => {

    const [tsOne, setTsOne] = useState<Tsone | undefined>();
    const { data: tsOneRequest, isLoading } = useFetchRequestTsLists(undefined)

    useEffect(() => {
        if (tsOneRequest) {
            setTsOne(tsOneRequest)
        }
    }, [tsOneRequest])

    return {
        tsOne, isLoading
    }
}