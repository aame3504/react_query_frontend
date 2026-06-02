import axios from "axios";

export const todosGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/todos")
        return response.data
    }catch(error){
        return error
    }
}

export const todosPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/todos",dataObj)
        return response.data
    }catch(error){
        return error
    }
}

export const todosPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://localhost:3001/todos/${dataObj.id}`,dataObj)
        return response.data
    }catch(error){
        return error
    }
}

export const todosDeleteApi = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:3001/todos/${id}`)
        return response.data
    }catch(error){
        return error
    }
}