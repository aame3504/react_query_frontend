import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { employeeAllGetApi, employeeDeleteApi, employeePostApi,employeePutApi, } from "../apis/employee.api";

export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async (_, thunkApi) => {
        try {
            return await employeeAllGetApi();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async (dataObj, thunkApi) => {
        try {
            return await employeePostApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async (dataObj, thunkApi) => {
        try {
            return await employeePutApi(dataObj);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async (id, thunkApi) => {
        try {
            return await employeeDeleteApi(id);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialEmp = {
    id: '', name: '', email: '', job: '', pay: ''
}
const initialState = {
    empTable: [],
    emp: initialEmp,
    mode: '',
    selectedId: "",
    loading: false,
    error: null
}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers: {
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload
        },
        update: (state, action) => {
            state.empTable = state.empTable.map(item =>
                item.id === state.selectedId ?
                    action.payload : item
            )
        },
        remove: (state, action) => {
            state.empTable = state.empTable.filter(item =>
                item.id !== state.selectedId
            )
        },
        setMode: (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(employeeAllGetSlice.fulfilled, (state, action) => {
                state.empTable = action.payload
                state.loading = false
            })
            .addCase(employeeAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(employeePostSlice.fulfilled, (state, action) => {
                state.empTable = [...state.empTable, action.payload]
                state.loading = false
            })
            .addCase(employeePutSlice.fulfilled, (state, action) => {
                state.empTable = state.empTable.map(item =>
                item.id === state.selectedId ?
                    action.payload : item
                )   
                state.loading = false
            })
            .addCase(employeeDeleteSlice.fulfilled, (state) => {
                state.empTable = state.empTable.filter(item =>
                item.id !== state.selectedId
                )   
                state.loading = false
            })
    }
})

export const { select, setEmp, register, update, remove, setMode } = employeeSlice.actions;
export default employeeSlice.reducer;