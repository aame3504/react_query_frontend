import React from 'react'
import SalesTable from './SalesTable';
import { getCurrentUser } from '../../no3_store/hooks/useUser';

const SalesPage = () => {
    const user = getCurrentUser();
  if(!user){
    return(
      <AuthControl
        message="로그인 후 상품 정보를 조회 및 관리할 수 있습니다."
      />
    )
  }
  return (
    <div>
      <SalesPage/>
    </div>
  )
}

export default SalesPage
