// EmployeeList.jsx

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { employeeAllGetSlice, select } from '../../no3_store/slices/employeeSlice';

const EmployeeList = () => {
  const {empTable, selectedId} =useSelector(state=>state.emp);
  const dispatch = useDispatch(); 
  useEffect(()=>{
    dispatch(employeeAllGetSlice())
  },[dispatch])
  return (
    <Container>
      {/* {console.log(empTable)} */}
      {
        empTable[0] && empTable.map(item => (
          <EmployeeButton
            key={item.id}
            $active={selectedId === item.id}
            onClick={() => dispatch(select(item.id))}
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