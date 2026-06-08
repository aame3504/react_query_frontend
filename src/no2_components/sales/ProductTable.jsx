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
          // 그리드 내부 버튼 스타일 부착
          <div style={styles.actionContainer}>
            <button 
              style={styles.btnEdit} 
              onClick={() => handleUpdate(params.data)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e6f4ff'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              수정
            </button>
            <button 
              style={styles.btnDelete} 
              onClick={() => handleDelete(params.data.id)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff2f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              삭제
            </button>
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
    <div style={styles.container}>
      {/* 상단 타이틀 및 등록 버튼 레이아웃 스타일 부착 */}
      <div style={styles.header}>
        <div style={styles.title}>상품 관리</div>
        <button 
          style={styles.btnRegister} 
          onClick={handleRegister}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0958d9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1677ff'}
        >
          상품 등록
        </button>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: "700px", width: "100%", borderRadius: '8px', overflow: 'hidden' }}>
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
    </div>
  );
};

// 💅 파일 내부에 첨부된 스타일 정의
const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  btnRegister: {
    backgroundColor: '#1677ff', // AntD 기본 블루색상 매칭
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  actionContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    height: '100%',
  },
  btnEdit: {
    backgroundColor: '#ffffff',
    color: '#1677ff',
    border: '1px solid #1677ff',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnDelete: {
    backgroundColor: '#ffffff',
    color: '#ff4d4f', // AntD 기본 레드색상 매칭
    border: '1px solid #ff4d4f',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }
};

export default ProductTable;