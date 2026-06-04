// EmployeeList.jsx

import React from 'react'
import styled from 'styled-components';
import { useAllGetEmployee } from "../../no3_store/hooks/useEmployee"

const EmployeeList = ({ selectedId, setSelectedId }) => {
  const { data: empTable = [], isLoading, error } = useAllGetEmployee()
  
  if (isLoading) return <h3>Loading...</h3>
  if (error) return <h3>{error.message}</h3>
  
  return (
    <Container>
      {
        empTable?.map(item => (
          <EmployeeButton
            key={item.id}
            $active={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
          >
            {item.name}
          </EmployeeButton>
        ))
      }
    </Container>
  )
}

export default EmployeeList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EmployeeButton = styled.button`
  border: none;
  padding: 14px;
  border-radius: 10px;

  background: ${({$active}) =>
    $active ? "#3b82f6" : "#e2e8f0"};

  color: ${({$active}) =>
    $active ? "white" : "#1e293b"};

  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;

  &:hover{
    opacity: 0.85;
  }
`