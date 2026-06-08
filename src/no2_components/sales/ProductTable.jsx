import React, { useMemo, useState } from 'react';
import ProductModal from './ProductModal'; 
import { useAllGetProduct, useDeleteProduct, usePostRegisterProduct, usePutUpdateProduct } from '../../no3_store/hooks/useProduct';
import { AgGridReact } from 'ag-grid-react';

const ProductTable = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  
  const { data: productList = [], isLoading, error } = useAllGetProduct();
  const registerMutation = usePostRegisterProduct();
  const updataMutation = usePutUpdateProduct(); 
  const deleteMutation = useDeleteProduct();

  const handleRegister = () => {
    setNewProduct(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleUpdate = (data) => {
    setNewProduct(data); 
    setOpen(true);
  };

  const columnDefs = useMemo(
    () => [
      { field: "product_name", headerName: "상품명", flex: 1 },
      { field: "color", headerName: "색깔", flex: 1 },
      { field: "cost_price", headerName: "원가", flex: 1 },
      { field: "sale_price", headerName: "판매가", flex: 1 },
      { field: "category_code", headerName: "카테고리 코드", flex: 1 },
      {
        headerName: "상품 관리",
        cellRenderer: (params) => (
          <div>
            <button onClick={() => handleUpdate(params.data)}>수정</button>
            <button onClick={() => handleDelete(params.data.id)}>삭제</button>
          </div>
        ),
        flex: 1,
      },
    ],
    []
  );

  if (isLoading) return <h3>loading..</h3>;
  if (error) return <h3>{error?.message}</h3>;

  return (
    <>
      <div>
        <div>상품 관리</div>
        <button onClick={handleRegister}>상품 등록</button>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: "800px", width: "100%" }}>
        <AgGridReact
          theme="legacy"
          rowData={productList}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={25}
          paginationPageSizeSelector={false}
          animateRows={true}
          getRowId={(params) => params.data.id.toString()}
        />
      </div>

      <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct} 
        onSubmit={async (productObj) => {
          if (newProduct) {
            await updataMutation.mutateAsync({...productObj, id:newProduct.id});
          } else {
            await registerMutation.mutateAsync(productObj);
          }
        }}
      />
    </>
  );
};

export default ProductTable;