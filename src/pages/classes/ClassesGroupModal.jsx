import React from "react";
import { Modal, Form, Input, Select } from "antd";

const ClassesGroupModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  return (
    <Modal
      title={initialValues ? "클래스 그룹 수정" : "클래스 그룹 추가"}
      open={visible}
      onOk={() => form.validateFields().then(onSubmit)}
      onCancel={onCancel}
      okText="저장"
      cancelText="취소"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="그룹명"
          name="title"
          rules={[{ required: true, message: "그룹명을 입력해주세요!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="그룹 설명"
          name="description"
          rules={[{ required: true, message: "그룹 설명을 입력해주세요!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="차감 방식"
          name="chargeType"
          rules={[{ required: true, message: "차감 방식을 선택해주세요!" }]}
        >
          <Select>
            <Select.Option value="횟수차감">횟수 차감</Select.Option>
            <Select.Option value="기간차감">기간 차감</Select.Option>
            <Select.Option value="정액제">정액제</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClassesGroupModal;
