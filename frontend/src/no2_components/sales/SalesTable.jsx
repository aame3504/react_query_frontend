import React from 'react'
import { useGetSales } from '../../no3_store/hooks/useSales'
import { AgGridReact } from 'ag-grid-react';

const SalesTable = () => {
    const rowData = useGetSales();
    const columnDefs = [
        {field: 'id', headerName: "주문번호", flex:1},
        {field: 'user_name', headerName: "회원명", flex:1},
        {field: 'product_name', headerName: "상품명", flex:1},
        {field: 'quantity', headerName: "수량", flex:1},
        {field: 'discount_rate', headerName: "할인율", flex:1},
        {field: 'total_price', headerName: "결제금액", flex:1},
        {field: 'created_at', headerName: "주문일자", flex:1},
    ]
  return (
    <div className='ag-theme-alpine' style={{width:"100%", height:"700px"}}>
       <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={25}
       />
    </div>
  )
}

export default SalesTable
