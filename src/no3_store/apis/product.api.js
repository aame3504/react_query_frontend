import axios from "axios";



export const productAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/product")
        return response.data
    }
    catch(error){
        return error
    }
}


export const productGetApi = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3001/product/${id}`)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/product",dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://localhost:3001/product/${dataObj.id}`,dataObj)
        return response.data
    }
    catch(error){
        return error
    }
}

export const productDeleteApi = async (id) => {
    try{
        await axios.delete(`http://localhost:3001/product/${id}`)
        return id
    }
    catch(error){
        return error
        //sdsdfsdf
    }
}