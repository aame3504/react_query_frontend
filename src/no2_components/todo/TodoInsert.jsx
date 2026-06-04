import React, { useState } from 'react'
import styled from 'styled-components'
import { usePostTodo } from '../../no3_store/hooks/usetodo';

const TodoInsert = () => {
  const [subject, setSubject] = useState("");
  const { mutate: addTodo } = usePostTodo();

  const handleChange = (e) => {
    setSubject(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    addTodo({ 
      subject, 
      checked: false 
    }); 
    
    setSubject("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="subject"
        value={subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요'
      />
      <Button>
        입력
      </Button>
    </Form>
  )
}

export default TodoInsert

const Form = styled.form`
  display: flex;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  &:focus{
    border-color: #3b82f6;
  }
`

const Button = styled.button`
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  background: #3b82f6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  &:hover{
    background: #2563eb;
  }
`