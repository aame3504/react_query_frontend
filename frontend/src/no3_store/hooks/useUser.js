import {
    useQuery,
    useMutation
} from "@tanstack/react-query"
import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi
} from "../apis/user.api"


export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    })
}

export const useLoginUser = () => {
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (user) =>{
            localStorage.setItem("currentUser", JSON.stringify(user));
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
