// FormPayment.jsx
import React from "react";
import { Form, Input, Button, Space } from "antd";

const FormPayment = ({ initialValues, onSubmit, onPrev }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      style={{ maxWidth: 500, margin: "0 auto" }}
    >
      <Form.Item
        name="paymentMethod"
        label="결제 방식"
        rules={[{ required: true, message: "결제 방식을 선택해주세요." }]}
      >
        <Input placeholder="예: 카드, 계좌이체 등" />
      </Form.Item>
      <Form.Item
        name="paymentInfo"
        label="결제 정보"
        rules={[{ required: true, message: "결제 정보를 입력해주세요." }]}
      >
        <Input placeholder="카드 번호, 계좌번호 등" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={onPrev}>이전</Button>
          <Button type="primary" onClick={handleSubmit}>
            등록
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormPayment;
