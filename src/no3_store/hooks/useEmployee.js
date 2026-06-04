// useEmpoyee.js (Hooks)

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeAllGetApi, employeePostApi, employeePutApi, employeeDeleteApi, employeeGetApi } from "../apis/employee.api";

export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllGetApi
    })
}

export const useGetEmployee = (id) => {
    return useQuery({
        queryKey: ["employees", id],
        queryFn: () => employeeGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => [
                    ...oldData, dataObj
                ]
            )
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => oldData.map(item =>
                    item.id === dataObj.id ?
                        dataObj : item
                )
            )
            queryClient.setQueryData(
                ["employees", dataObj.id],
                dataObj
            )
            queryClient.invalidateQueries({
                queryKey: ["employees", dataObj.id]
            })
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(
                ["employees"],
                (oldData = []) => oldData.filter(item =>
                    item.id !== id
                )
            )
            queryClient.removeQueries({
                queryKey: ["employees", id]
            })
        }
    })
}