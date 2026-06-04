import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from './no1_pages/HomePage'
import TodoPage from './no1_pages/TodoPage'
import EmployeePage from './no1_pages/EmployeePage'
import HeaderBar from './no2_components/layout/HeaderBar'
import SiderBar from './no2_components/layout/SiderBar'
import LoginPage from './no1_pages/user/LoginPage'
import RegisterPage from './no1_pages/user/RegisterPage'
import EmployeeProvider from './no0_context/EmployeeContext'
import UserProvider from './no0_context/UserContext'
import TodoProvider from './no0_context/TodoContext'
import { Provider } from 'react-redux'
import store from './no3_store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Container>
          <HeaderBar />
          <BodyLayout>
            <SiderBar />
            <PageContainer>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/employee" element={<EmployeePage />} />
              </Routes>
            </PageContainer>
          </BodyLayout>
        </Container>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #f1f5f9;
`;

const BodyLayout = styled.div`
    display: flex;
`;

const PageContainer = styled.main`
    flex: 1;
    padding: 32px;
    background: #f8fafc;
    min-height: calc(100vh - 70px);

    @media (max-width: 768px){
        padding: 90px 20px 20px 20px;
    }
`;