import axios from "axios";

export const userAllGetApi = async () => {
    const response = await axios.get("http://localhost:3001/user");
    return response.data;
};

export const userLoginApi = async (userObj) => {
    try {
        const response = await axios.get(`http://localhost:3001/user?username=${userObj.username}`);
        const users = response.data;
        
        if (!users || users.length === 0) {
            throw new Error("존재하지 않는 계정입니다.");
        }
        
        const user = users[0];
        
        if (user.password !== userObj.password) {
            throw new Error("일치하지 않는 비밀번호입니다.");
        }
        
        return user;
        
    } catch (error) {
        throw new Error(error.message);
    }
};

export const userRegisterApi = async (loginUser) => {
    const response = await axios.get(`http://localhost:3001/user?username=${loginUser.username}`);
    const users = response.data;
    
    if (users && users.length > 0) {
        throw new Error("이미 존재하는 계정입니다.");
    }

    const postResponse = await axios.post(`http://localhost:3001/user`, loginUser);
    return postResponse.data;
};