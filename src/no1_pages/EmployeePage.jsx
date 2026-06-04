// EmployeePage.jsx

import React, { useState } from 'react'
import styled from 'styled-components';
import EmployeeList from '../no2_components/employee/EmployeeList'
import EmployeeTable from '../no2_components/employee/EmployeeTable'
import EmployeeRegister from '../no2_components/employee/EmployeeRegister'
import EmployeeUpdate from '../no2_components/employee/EmployeeUpdate'
import { useDeleteEmployee } from "../no3_store/hooks/useEmployee"

const EmployeePage = () => {
  const [selectedId, setSelectedId] = useState("");
  const [mode, setMode] = useState("register");
  const deleteMutation = useDeleteEmployee();
  
  const handleDelete = async() => {
    if(!selectedId) {
      alert("삭제할 데이터를 선택하세요");
      return;
    }
    try{
      await deleteMutation.mutateAsync(selectedId)
      alert("데이터가 삭제되었습니다.");
      setSelectedId("");
      setMode(null);
    }catch(error){
      alert("delete failed")
      return;
    }
  }

  return (
    <Container>
      <Title>
        Employee Management
      </Title>

      <Content>
        <LeftSection>
          <Card>
            <SectionTitle>
              직원 목록
            </SectionTitle>
            <EmployeeList
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </Card>
        </LeftSection>

        <RightSection>
          <Card>
            <SectionTitle>
              직원 정보
            </SectionTitle>
            <EmployeeTable/>
          </Card>

          <Card>
            <ButtonGroup>
              <ActionButton
                onClick={() => setMode("register")}
              >
                등록
              </ActionButton>

              <ActionButton
                onClick={() => setMode("update")}
              >
                수정
              </ActionButton>

              <DeleteButton
                onClick={() => setMode("delete")}
              >
                삭제
              </DeleteButton>
            </ButtonGroup>

            {
              mode === "register" ? 
              <EmployeeRegister selectedId={selectedId} />
              : mode === "update" ? 
              <EmployeeUpdate selectedId={selectedId} />
              : mode === "delete" ? 
              <DeleteBox>
                <p>위 데이터를 삭제하시겠습니까?</p>
                <DeleteConfirmButton
                  onClick={handleDelete}
                >
                  삭제 확인
                </DeleteConfirmButton>
              </DeleteBox>
              : null
            }
          </Card>
        </RightSection>
      </Content>
    </Container>
  )
}

export default EmployeePage


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 32px;
  background: #f1f5f9;
`

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #0f172a;
`

const Content = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 900px){
    flex-direction: column;
  }
`

const LeftSection = styled.div`
  width: 280px;

  @media (max-width: 900px){
    width: 100%;
  }
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #1e293b;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`

const ActionButton = styled.button`
  border: none;
  background: #3b82f6;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover{
    opacity: 0.85;
  }
`

const DeleteButton = styled(ActionButton)`
  background: #ef4444;
`

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const DeleteConfirmButton = styled.button`
  width: 160px;
  border: none;
  background: #ef4444;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover{
    opacity: 0.85;
  }
`