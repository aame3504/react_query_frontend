import axios from "axios";


export const salesAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/sales")
        return response.data
    }
    catch(error){
        return error
    }
}


export const salesGetApi = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3001/sales/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/sales",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://localhost:3001/sales/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesDeleteApi = async (id) => {
    try{
        await axios.delete(`http://localhost:3001/sales/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}