// TodoList.jsx

import React, { useEffect } from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux'
import { todosGetSlice } from '../../no3_store/slices/todoSlice'

const TodoList = () => {
  const {todoList} = useSelector(state=>state.todo);
  const dispatch = useDispatch();
   useEffect(()=>{
      dispatch(todosGetSlice())
    },[dispatch])
  return (
    <Container>
      {
        todoList[0] && todoList.map(item => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`