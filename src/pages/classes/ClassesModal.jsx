import React from "react";
import { Modal, Form, Input } from "antd";

const ClassesModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  chargeType,
}) => {
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
      title={initialValues ? "수업 수정" : "수업 추가"}
      open={visible}
      onOk={() => form.validateFields().then(onSubmit)}
      onCancel={onCancel}
      okText="저장"
      cancelText="취소"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="수업명"
          name="title"
          rules={[{ required: true, message: "수업명을 입력해주세요!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="수업 설명"
          name="description"
          rules={[{ required: true, message: "수업 설명을 입력해주세요!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="차감 방식">
          <Input value={chargeType} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClassesModal;
