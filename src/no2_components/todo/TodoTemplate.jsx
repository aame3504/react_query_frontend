// TodoTemplate.jsx

import React from 'react'
import styled from 'styled-components'

const TodoTemplate = ({ children }) => {
  return (
    <Container>
      <Title>📋 일정 관리</Title>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default TodoTemplate

const Container = styled.div`
  width: 500px;

  margin: 60px auto;

  background: #ffffff;

  border-radius: 20px;

  padding: 30px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`

const Title = styled.h1`
  text-align: center;

  margin-bottom: 30px;

  color: #222;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`
