// FormContract.jsx
import React from "react";
import { Form, Select, Button, Space } from "antd";

const FormContract = ({ initialValues, onNext, onPrev }) => {
  const [form] = Form.useForm();

  const handleNext = () => {
    form.validateFields().then((values) => {
      onNext(values);
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
        name="membership"
        label="멤버십 선택"
        rules={[{ required: true, message: "멤버십을 선택해주세요." }]}
      >
        <Select placeholder="멤버십 선택">
          <Select.Option value="basic">베이직</Select.Option>
          <Select.Option value="premium">프리미엄</Select.Option>
          <Select.Option value="vip">VIP</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={onPrev}>이전</Button>
          <Button type="primary" onClick={handleNext}>
            다음
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormContract;
