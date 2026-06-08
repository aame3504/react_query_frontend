import {
    useQueryClient,
    useMutation
} from "@tanstack/react-query"
import {
    userLoginApi,
    userRegisterApi
} from "../apis/user.api"


export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (user) =>{
            localStorage.setItem("currentUser", JSON.stringify(user));
            queryClient.setQueriesData(
                ["user"], user
            )
        }
    })
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const logout = () => {
    localStorage.removeItem("currentUser")
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser")
    return user && JSON.parse(user)
}
