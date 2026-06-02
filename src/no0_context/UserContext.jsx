import React, { createContext, useReducer } from 'react'

export const UserContext = createContext(); 

const initialUsers = [
  {id: 1, username: "john", password: "1111"},
  {id: 2, username: "peter", password: "1111"},
  {id: 3, username: "susan", password: "1111"},
  {id: 4, username: "sue", password: "1111"},
]
const initialState = {
    users: initialUsers,
    username: '',
    isLogin: false
}
const reducer = (state, action)=>{
  switch(action.type){
    case "login":
      return{
        ...state,
        username: action.payload.username,
        isLogin: true
      }
    case "register":
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: action.payload.id,
            username: action.payload.user.username,
            password: action.payload.user.password
          }
        ]
      }
    case "logout":
      return {
        ...state,
        isLogin: false,
        username: ""
      }
    default:
      return state;
  }

}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
