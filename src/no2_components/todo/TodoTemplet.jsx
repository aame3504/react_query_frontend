import React from 'react'
import styled from 'styled-components'

const TodoTemplet = ({children}) => {
  return (
    <TempletBlock>
        <AppTitle>일정 관리</AppTitle>
      <Content>
        {children}
      </Content>
    </TempletBlock>
  )
}

export default TodoTemplet

// --- Styled Components ---
const TempletBlock = styled.div`
    width: 512px;
    margin: 4rem auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: white;
`

const AppTitle = styled.div`
    background: #3b82f6; // 시원한 파란색 테마
    color: white;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
`

const Content = styled.div`
    background: white;
`