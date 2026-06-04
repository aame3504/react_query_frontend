import React from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useGetTodo } from '../../no3_store/hooks/usetodo';

const TodoList = () => {
  const { data: todoList = [], isLoading, isError } = useGetTodo();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <Container>
      {
        todoList.length > 0 && todoList.map(item => (
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