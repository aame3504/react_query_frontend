import React, { useState } from 'react'
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from "react-icons/md"
import styled from 'styled-components'
import { usePutTodo, useDeleteTodo } from '../../no3_store/hooks/usetodo';

const TodoListChild = ({ item }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(item.subject)

  const { mutate: updateTodo } = usePutTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleUpdate = () => {
    if (value.trim() !== item.subject) {
      updateTodo({
        ...item,
        subject: value
      })
    }
    setEditing(false)
  }

  const handleToggleCheck = () => {
    updateTodo({ ...item, checked: !item.checked });
  }

  const handleDelete = () => {
    deleteTodo(item.id);
  }

  return (
    <Container>
      <CheckBoxArea onClick={handleToggleCheck}>
        {
          item.checked
            ? <MdCheckBox />
            : <MdCheckBoxOutlineBlank />
        }
      </CheckBoxArea>

      <ContentArea>
        {
          editing ? (
            <EditInput
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur() 
                }
              }}
              autoFocus
            />
          ) : (
            <Checked
              $checked={item.checked}
              onDoubleClick={() => setEditing(true)}
            >
              {item.subject}
            </Checked>
          )
        }
      </ContentArea>

      <DeleteButton onClick={handleDelete}>
        <MdRemoveCircleOutline />
      </DeleteButton>

    </Container>
  )
}

export default TodoListChild

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: 0.2s;
  &:hover{
    transform: translateY(-2px);
  }
`

const CheckBoxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #3b82f6;
  cursor: pointer;
`

const ContentArea = styled.div`
  flex: 1;
`

const Checked = styled.div`
  font-size: 18px;
  color: ${({ $checked }) =>
    $checked ? "#999" : "#222"};
  text-decoration: ${({ $checked }) =>
    $checked ? "line-through" : "none"};
  transition: 0.2s;
  cursor: pointer;
`

const EditInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  &:focus{
    border-color: #3b82f6;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ef4444;
  cursor: pointer;
  transition: 0.2s;
  &:hover{
    transform: scale(1.1);
  }
`