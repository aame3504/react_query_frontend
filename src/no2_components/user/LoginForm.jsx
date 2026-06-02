import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../no3_store/slices/userSlice';

const initialState = {
  username: "",
  password: ""
}
const LoginForm = () => {
  const {users} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginUser = users.filter(item => (
      item.username === user.username &&
      item.password === user.password
    ))[0]

    if (loginUser) {
      alert("로그인 성공")
      dispatch(login(loginUser.username))
      navigate("/")
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>

        <Logo>MySystem</Logo>

        <Title>로그인</Title>

        <Description>
          계정에 로그인하여 서비스를 이용하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>

          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>

          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>

        <LoginButton>
          로그인
        </LoginButton>

        <Divider />

        <RegisterButton
          type="button"
          onClick={() => navigate("/register")}
        >
          회원가입
        </RegisterButton>

      </Form>
    </Container>
  )
}

export default LoginForm;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #e0f2fe,
    #f8fafc,
    #dbeafe
  );

  padding: 20px;
`

const Form = styled.form`
  width: 100%;
  max-width: 420px;

  background: white;

  padding: 48px 40px;

  border-radius: 24px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08),
    0 4px 10px rgba(0,0,0,0.04);

  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: #2563eb;

  text-align: center;

  margin-bottom: 12px;
`

const Title = styled.h2`
  text-align: center;

  font-size: 28px;
  color: #0f172a;

  margin-bottom: 10px;
`

const Description = styled.p`
  text-align: center;

  color: #64748b;
  font-size: 15px;

  margin-bottom: 32px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;

  color: #334155;

  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;

  padding: 14px 16px;

  border: 1px solid #cbd5e1;
  border-radius: 12px;

  font-size: 15px;

  outline: none;

  transition: 0.2s;

  &:focus{
    border-color: #3b82f6;

    box-shadow:
      0 0 0 4px rgba(59,130,246,0.15);
  }
`

const BaseButton = styled.button`
  width: 100%;

  border: none;
  border-radius: 12px;

  padding: 14px;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
`

const LoginButton = styled(BaseButton)`
  background: #2563eb;
  color: white;

  margin-top: 8px;

  &:hover{
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;

  background: #e2e8f0;

  margin: 24px 0;
`

const RegisterButton = styled(BaseButton)`
  background: #eff6ff;
  color: #2563eb;

  &:hover{
    background: #dbeafe;
  }
`