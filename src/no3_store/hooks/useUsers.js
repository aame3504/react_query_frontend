import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAllGetApi, userLoginApi, userRegisterApi } from "../apis/user.api";

export const useUserAllGet = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: userAllGetApi
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (user) => {
            localStorage.setItem("currentUser", JSON.stringify(user));
            queryClient.setQueryData(["user"], user); 
        }
    });
};

export const useUserRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userRegisterApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem("currentUser");
        },
        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            queryClient.removeQueries({ queryKey: ["user"] });
        }
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => {
            const user = localStorage.getItem("currentUser");
            return user ? JSON.parse(user) : null;
        },
        staleTime: Infinity, 
    });
};