import React, { useState } from "react";
import { Tabs, Card, Row, Col, Button, Switch, List, Dropdown } from "antd";
import { MdMoreVert } from "react-icons/md";
import ClassesGroupModal from "./ClassesGroupModal";
import ClassesModal from "./ClassesModal";
import { v4 as uuidv4 } from "uuid";

const { TabPane } = Tabs;

const FormClasses = ({ classesData, onSave }) => {
  const [localClasses, setLocalClasses] = useState(classesData);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);

  const openGroupModal = (category, group = null) => {
    setCurrentCategory(category);
    setCurrentGroup(group);
    setIsGroupModalOpen(true);
  };

  const openClassModal = (group, cls = null) => {
    setCurrentGroup(group);
    setCurrentClass(cls);
    setIsClassModalOpen(true);
  };

  const closeModals = () => {
    setIsGroupModalOpen(false);
    setIsClassModalOpen(false);
    setCurrentGroup(null);
    setCurrentClass(null);
  };

  const handleGroupSubmit = (values) => {
    const updatedCategory = [...(localClasses[currentCategory] || [])];
    if (currentGroup) {
      const index = updatedCategory.findIndex(
        (group) => group.id === currentGroup.id
      );
      updatedCategory[index] = { ...currentGroup, ...values };
    } else {
      updatedCategory.push({
        id: uuidv4(),
        ...values,
        isActive: true,
        classes: [],
      });
    }
    const updatedClasses = {
      ...localClasses,
      [currentCategory]: updatedCategory,
    };
    setLocalClasses(updatedClasses);
    onSave(updatedClasses);
    closeModals();
  };

  const handleClassSubmit = (values) => {
    const updatedClasses = currentGroup.classes || [];
    if (currentClass) {
      const index = updatedClasses.findIndex(
        (cls) => cls.id === currentClass.id
      );
      updatedClasses[index] = { ...currentClass, ...values };
    } else {
      updatedClasses.push({ id: uuidv4(), ...values });
    }
    const updatedCategory = localClasses[currentCategory].map((group) =>
      group.id === currentGroup.id
        ? { ...currentGroup, classes: updatedClasses }
        : group
    );
    const updatedData = { ...localClasses, [currentCategory]: updatedCategory };
    setLocalClasses(updatedData);
    onSave(updatedData);
    closeModals();
  };

  const handleDeleteGroup = (category, groupId) => {
    const updatedCategory = localClasses[category].filter(
      (group) => group.id !== groupId
    );
    const updatedClasses = { ...localClasses, [category]: updatedCategory };
    setLocalClasses(updatedClasses);
    onSave(updatedClasses);
  };

  const handleSwitchChange = (checked, category, groupId) => {
    const updatedCategory = localClasses[category].map((group) =>
      group.id === groupId ? { ...group, isActive: checked } : group
    );
    const updatedClasses = { ...localClasses, [category]: updatedCategory };
    setLocalClasses(updatedClasses);
    onSave(updatedClasses);
  };

  const handleDeleteClass = (group, classId) => {
    const updatedClasses = group.classes.filter((cls) => cls.id !== classId);
    const updatedCategory = localClasses[currentCategory].map((grp) =>
      grp.id === group.id ? { ...group, classes: updatedClasses } : grp
    );
    const updatedData = { ...localClasses, [currentCategory]: updatedCategory };
    setLocalClasses(updatedData);
    onSave(updatedData);
  };

  const renderGroupMenu = (category, group) => ({
    items: [
      {
        key: "1",
        label: "클래스 그룹 수정",
        onClick: () => openGroupModal(category, group),
      },
      {
        key: "2",
        label: "클래스 그룹 삭제",
        danger: true,
        onClick: () => handleDeleteGroup(category, group.id),
      },
      {
        key: "3",
        label: "수업 추가",
        onClick: () => openClassModal(group),
      },
    ],
  });

  const renderGroups = (category, groupList) => (
    <Row gutter={[16, 16]}>
      {groupList.map((group) => (
        <Col span={8} key={group.id}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {group.title}
                <Switch
                  size="small"
                  checked={group.isActive}
                  onChange={(checked) =>
                    handleSwitchChange(checked, category, group.id)
                  }
                  style={{ marginLeft: "10px" }}
                />
              </div>
            }
            extra={
              <Dropdown
                menu={renderGroupMenu(category, group)}
                trigger={["click"]}
              >
                <MdMoreVert style={{ fontSize: "20px", cursor: "pointer" }} />
              </Dropdown>
            }
          >
            <p>{group.description}</p>
            {group.classes && (
              <List
                size="small"
                dataSource={group.classes}
                renderItem={(cls) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => openClassModal(group, cls)}
                      >
                        수정
                      </Button>,
                      <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteClass(group, cls.id)}
                      >
                        삭제
                      </Button>,
                    ]}
                  >
                    {cls.title} - {cls.description}
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      ))}
      <Col span={8}>
        <Button
          type="dashed"
          style={{ width: "100%", height: "100%" }}
          onClick={() => openGroupModal(category)}
        >
          + 클래스 그룹 추가
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        {Object.keys(localClasses).map((category, index) => (
          <TabPane
            tab={`${category} (${
              localClasses[category].filter((p) => p.isActive).length
            }/${localClasses[category].length})`}
            key={index + 1}
          >
            {renderGroups(category, localClasses[category])}
          </TabPane>
        ))}
      </Tabs>

      <ClassesGroupModal
        visible={isGroupModalOpen}
        onCancel={closeModals}
        onSubmit={handleGroupSubmit}
        initialValues={currentGroup}
      />

      <ClassesModal
        visible={isClassModalOpen}
        onCancel={closeModals}
        onSubmit={handleClassSubmit}
        initialValues={currentClass}
        chargeType={currentGroup?.chargeType}
      />
    </>
  );
};

export default FormClasses;
