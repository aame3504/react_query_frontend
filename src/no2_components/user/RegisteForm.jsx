import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../../no0_context/UserContext'

const initialState = {
    id: "",
    username: "",
    password: "",
    confirmPassword: ""
}

const RegisteForm = () => {
    const [user, setUser] = useState(initialState)
    const { dispatch } = useContext(UserContext)
    const navi = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (user.password !== user.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        dispatch({
            type: "register", 
            payload: { id: Date.now(), user }
        })

        navi("/login")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Title>회원등록</Title>
            <Card>
                <Input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="사용자이름"
                />
                <Input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                />
                <RegisterButton type="submit">등록</RegisterButton>
                <LoginButton type="button" onClick={() => navi("/login")}>
                    이미 회원이신가요? 로그인
                </LoginButton>
            </Card>
        </Form>
    )
}

export default RegisteForm

const Form = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f1f5f9;
`
const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  color: #1e393d;
  font-size: 24px;
`
const Card = styled.div`
  width: 400px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #dbe4ee;
  font-size: 16px;
  outline: none;
  transition: 0.2s;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`
const BaseButton = styled.button`
  width: 100%;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
`
const RegisterButton = styled(BaseButton)`
  background: #3b82f6;
  color: white;
  margin-bottom: 12px;
  &:hover {
    background: #2563eb;
  }
`
const LoginButton = styled(BaseButton)`
  background: transparent;
  color: #3b82f6;
  &:hover {
    background: #eff6ff;
  }
`