import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';

const ProductModal = ({ open, setOpen, initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);
  
  const onFinish = async (productObj) => {
    await onSubmit(productObj);
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      width={600} // 모달 너비를 조금 더 컴팩트하게 조정
      centered
      // 모달 바디 패딩 커스텀 스타일 첨부
      styles={{ body: { padding: '24px 12px 12px 12px' } }} 
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          label={<span style={{ fontWeight: 600 }}>상품명</span>}
          name="product_name"
          rules={[{ required: true, message: "상품명을 입력하세요" }]}
        >
          <Input placeholder="예: 악세사리" style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: 600 }}>색상</span>}
          name="color"
          rules={[{ required: true, message: "색상을 선택하세요" }]}
        >
          <Select
            placeholder="색상 선택"
            style={{ borderRadius: '6px' }}
            options={[
              { value: "Black", label: "Black" },
              { value: "White", label: "White" },
              { value: "Red", label: "Red" },
              { value: "Blue", label: "Blue" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: 600 }}>원가</span>}
          name="cost_price"
          rules={[{ required: true, message: "원가를 입력하세요" }]}
        >
          <InputNumber placeholder="예: 40000" style={{ width: '100%', borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: 600 }}>카테고리 코드</span>}
          name="category_code"
          rules={[{ required: true, message: "카테고리 코드를 선택하세요" }]}
        >
          <Select
            placeholder="카테고리 코드 선택"
            style={{ borderRadius: '6px' }}
            options={[
              { value: "E1", label: "E1" },
              { value: "E2", label: "E2" },
              { value: "E3", label: "E3" },
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" }
            ]}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ 
              height: "48px", 
              borderRadius: "10px", 
              fontWeight: "bold",
              boxShadow: '0 4px 10px rgba(22, 119, 255, 0.2)' 
            }}
          >
            {initialValues ? "수정하기" : "등록하기"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;