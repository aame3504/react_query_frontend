// HomePage.jsx 예시
import React from 'react'
import styled from 'styled-components'

const HomePage = () => {
  return (
    <HomeContainer>
      <h1>환영합니다!</h1>
      <p>좌측 메뉴를 통해 Todo List나 Employee 관리를 이용해보세요.</p>
    </HomeContainer>
  )
}

export default HomePage

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #334155;
  
  h1 { font-size: 2.5rem; margin-bottom: 1rem; color: #1e293b; }
  p { font-size: 1.1rem; color: #64748b; }
`