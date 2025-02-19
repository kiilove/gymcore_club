import React, { useState } from "react";
import { Card, Switch, Modal, Form, Input, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ClassCardList = ({
  classes,
  parentTitle,
  parentId,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  // 수정 모달 열기
  const openEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      title: item.title,
      chargeType: item.chargeType,
      price: item.price,
    });
    setEditModalVisible(true);
  };

  // 모달 저장 버튼 클릭 시: 입력값 검증 후 onUpdate 콜백 호출
  const handleEditOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (onUpdate && editingItem) {
          onUpdate(editingItem.id, values);
        }
        setEditModalVisible(false);
        setEditingItem(null);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // 모달 취소 버튼 클릭 시
  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  if (!classes || classes.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
        해당 조건의 클래스가 없습니다.
      </p>
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {classes.map((item) => {
          const { id, title, chargeType, price, isActive } = item;
          return (
            <Card
              key={id}
              title={
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {title}
                </div>
              }
              size="small"
              style={{
                width: 320,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                backgroundColor: "#fff",
              }}
              // extra 영역: 활성화 스위치 배치
              extra={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, marginRight: 4, color: "#555" }}>
                    활성화
                  </span>
                  <Switch
                    size="small"
                    checked={isActive}
                    onClick={() => onToggle(parentTitle, parentId, id)}
                  />
                </div>
              }
              // actions 영역: 수정/삭제 아이콘 배치
              actions={[
                <EditOutlined
                  key="edit"
                  style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
                  onClick={() => openEditModal(item)}
                />,
                <Popconfirm
                  key="delete"
                  title="정말 삭제하시겠습니까?"
                  onConfirm={() => onDelete(item.id)}
                  okText="예"
                  cancelText="아니오"
                >
                  <DeleteOutlined
                    style={{ color: "red", fontSize: 18, cursor: "pointer" }}
                  />
                </Popconfirm>,
              ]}
            >
              <div style={{ fontSize: 13, color: "#555" }}>
                <p style={{ margin: "4px 0" }}>
                  차감방식: <strong>{chargeType}</strong>
                </p>
                <p style={{ margin: "4px 0" }}>
                  가격:{" "}
                  <strong style={{ color: "#1890ff" }}>
                    {parseInt(price).toLocaleString()}원
                  </strong>
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 수정 모달 */}
      <Modal
        title="클래스 수정"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="저장"
        cancelText="취소"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="타이틀"
            rules={[{ required: true, message: "타이틀을 입력하세요." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="chargeType"
            label="차감방식"
            rules={[{ required: true, message: "차감방식을 입력하세요." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="가격"
            rules={[{ required: true, message: "가격을 입력하세요." }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClassCardList;
