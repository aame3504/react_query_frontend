import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userAllGetApi } from "../apis/user.api"
import { userLoginApi,userRegisterApi } from "../apis/user.api"

export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async(userObj, thunkApi) =>{
        try{
            const user = await userLoginApi(userObj)
            localStorage.setItem("user",JSON.stringify(user))
            return user
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async(userObj, thunkApi) =>{
        try{
            const user = await userRegisterApi(userObj)
            localStorage.setItem("user",JSON.stringify(user))
            return user
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const userLogoutSlice = createAsyncThunk(
    "userLogoutSlice",
    async(_, thunkApi) =>{
        try{
            localStorage.removeItem("user")
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getUser = () =>{
    return JSON.parse(localStorage.getItem("user"))
}

const initialState = {
    userList: {},
    user: {},
    isLogin: false,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginSlice.pending,(state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLoginSlice.fulfilled,(state, action) => {
                const user = getUser();
                if(user.username === action.payload.username
                    && user.password===action.payload.password
                ){
                    state.isLogin = true
                    state.user = action.payload
                }
                
                state.user = action.payload
                state.loading = false
            })
            .addCase(userLoginSlice.rejected,(state, action) => {
                state.loading = false
                console.log("user",action.payload)
                state.error = action.payload
            })
            .addCase(userRegisterSlice.fulfilled,(state, action) => {
                state.userList = [...state.userList,action.payload]
                state.isLogin = false
                state.loading = false
            })
             .addCase(userLogoutSlice.fulfilled,(state, action) => {
                state.user = {}
                state.isLogin = false
                state.loading = false
            })
    }
})

export default userSlice.reducer;

const initialUsers = [
    { id: 1, username: "john", password: "1111" },
    { id: 2, username: "peter", password: "1111" },
    { id: 3, username: "susan", password: "1111" },
    { id: 4, username: "sue", password: "1111" },
]