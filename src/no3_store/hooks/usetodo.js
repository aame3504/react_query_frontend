import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosGetApi,todosDeleteApi,todosPostApi,todosPutApi } from "../apis/todo.api";

export const useGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todosGetApi
    })
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosPostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (oldData = []) => [
                    ...oldData, dataObj
                ]
            );
            queryClient.invalidateQueries({queryKey:["todos"]});
        }
    });
}

export const usePutTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (oldData = []) => oldData.map(item =>
                    item.id === dataObj.id ?
                        dataObj : item
                )
            )
            queryClient.setQueryData(
                ["todos", dataObj.id],
                dataObj
            )
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(
                ["todos"],
                (oldData = []) => oldData.filter(item =>
                    item.id !== id
                )
            )
            queryClient.removeQueries({
                queryKey: ["todos", id]
            })
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}