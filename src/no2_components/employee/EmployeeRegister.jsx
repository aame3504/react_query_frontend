// EmployeeRegister.jsx

import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { employeePostSlice } from '../../no3_store/slices/employeeSlice';



const initialEmp = {
    id: '',
    name: '',
    email: '',
    job: '',
    pay:''
}


const EmployeeRegister = () => {
    const [emp, setEmp] = useState(initialEmp);
    const dispatch = useDispatch(emp);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setEmp(prev => (
            {...prev, [name]: value}
        ))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = Date.now().toString();
        dispatch(employeePostSlice(emp))
        setEmp(initialEmp)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Label>이름</Label>
                <Input
                    type="text"
                    name="name"
                    value={emp.name}
                    onChange={handleChange}
                    placeholder='이름'
                />
            </InputGroup>
            <InputGroup>
                <Label>이메일</Label>
                <Input
                    type="email"
                    name="email"
                    value={emp.email}
                    onChange={handleChange}
                    placeholder='이메일'
                />
            </InputGroup>
            <InputGroup>
                <Label>직업</Label>
                <Input
                    type="text"
                    name="job"
                    value={emp.job}
                    onChange={handleChange}
                    placeholder='직업'
                />
            </InputGroup>
            <InputGroup>
                <Label>급여</Label>
                <Input
                    type="number"
                    name="pay"
                    value={emp.pay}
                    onChange={handleChange}
                    placeholder='급여'
                />
            </InputGroup>
            <SubmitButton>
                등록
            </SubmitButton>
        </Form>
    )
}

export default EmployeeRegister


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: bold;
  color: #334155;
`

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-size: 15px;

  &:focus{
    border-color: #3b82f6;
  }
`

const SubmitButton = styled.button`
  border: none;
  background: #10b981;
  color: white;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover{
    opacity: 0.85;
  }
`