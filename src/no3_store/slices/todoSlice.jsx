import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { todosDeleteApi, todosPostApi, todosGetApi, todosPutApi } from "../apis/todo.api"

const initialObj = {
    id: "",
    subject: "",
    checked: false
}
const initialState = {
    todoList: [
        { id: 1, subject: "HTML 공부", checked: false },
        { id: 2, subject: "CSS 공부", checked: true },
        { id: 3, subject: "React 공부", checked: false },
        { id: 4, subject: "Python 공부", checked: true },
    ],
    todoObj: {
        id: "",
        subject: "",
        checked: false,
        loading: false,
        error: null
    }
}

export const todosGetSlice = createAsyncThunk(
    "todosGetSlice",
    async (_, thunkApi) => {
        try {
            return await todosGetApi();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todosPostSlice = createAsyncThunk(
    "todosPostSlice",
    async (dataObj, thunkApi) => {
        try {
            return await todosPostApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todosPutSlice = createAsyncThunk(
    "todosPutSlice",
    async (dataObj, thunkApi) => {
        try {
            return await todosPutApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todosDeleteSlice = createAsyncThunk(
    "todosDeleteSlice",
    async (id, thunkApi) => {
        try {
            await todosDeleteApi(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)



const todoSlice = createSlice({
    name: "todoSlice",
    initialState, // initialState:initialState
    reducers: {
        update: (state, action) => {
            state.todoList = state.todoList.map(todo =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        subject: action.payload.value
                    }
                    : todo
            )
        },
        toggle: (state, action) => {
            state.todoList = state.todoList.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, checked: !todo.checked }
                    : todo
            )
        },
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name]: action.payload.value
            }
        },
        register: (state) => {
            state.todoList = [
                ...state.todoList,
                {
                    ...state.todoObj,
                    id:
                        state.todoList.length > 0
                            ? Math.max(...state.todoList.map(todo => todo.id)) + 1
                            : 1
                }
            ]
            state.todoObj = initialObj
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todosGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(todosGetSlice.fulfilled, (state, action) => {
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todosGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(todosPutSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.map(item =>
                    item.id === action.payload.id
                    ? action.payload
                    : item
                )
                state.loading = false
            })
            .addCase(todosPostSlice.fulfilled, (state, action) => {
                [
                    ...state.todoList,
                    {
                        ...state.todoObj,
                        id:
                            state.todoList.length > 0
                                ? Math.max(...state.todoList.map(todo => todo.id)) + 1
                                : 1
                    }
                ]
            })
            .addCase(todosDeleteSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(todo =>
                    todo.id !== action.payload)
            })
    }
})

export const { remove, update, toggle, change, register } = todoSlice.actions;
export default todoSlice.reducer; 