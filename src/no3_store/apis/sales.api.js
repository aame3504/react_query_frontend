import axios from "axios";



export const salesAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/employees")
        return response.data
    }
    catch(error){
        return error
    }
}


export const salesGetApi = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3001/employees/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/employees",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://localhost:3001/employees/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const salesDeleteApi = async (id) => {
    try{
        await axios.delete(`http://localhost:3001/employees/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}