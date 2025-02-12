import { Card, Col, List, Row, Switch, Tabs } from "antd";
import React, { useEffect, useState } from "react";

const FormClasses = ({ classesData, onSave }) => {
  const [classesGroup, setClassesGroup] = useState([]);
  const [classesSubItem, setClassesSubItem] = useState([]);
  const [classesSubTabs, setClassesSubTabs] = useState([]);
  const [currentGroupTitle, setCurrentGroupTitle] = useState(undefined);

  const renderClassItem = (data = [], isActive) => {
    if (data.length === 0) {
      return;
    }

    const renderItem = data?.map((item, idx) => {
      const { title, description, chargeType, TotalSessions, price } = item;

      return (
        <Card
          title={
            <p style={{ fontSize: 13 }} className="px-2">
              {title}
            </p>
          }
          size="small"
          style={{ width: "250px", height: "150px" }}
          extra={
            <div className="flex gap-x-2 justify-center items-center">
              <p style={{ fontSize: 12 }}>활성화</p>
              <Switch size="small" checked={isActive} />
            </div>
          }
        >
          <div
            className="flex flex-col w-full h-full p-2 text-gray-600 gap-y-1"
            style={{ fontSize: 13 }}
          >
            <p>{description}</p>
            <p>차감방식: {chargeType}</p>
            <p>가격: {parseInt(price)?.toLocaleString()}원</p>
          </div>
        </Card>
      );
    });

    return (
      <div className="flex justify-start items-center w-full gap-2 flex-wrap">
        {renderItem}
      </div>
    );
  };
  useEffect(() => {
    if (!classesData) {
      return;
    }
    setClassesGroup(() => Object.keys(classesData));
  }, [classesData]);

  useEffect(() => {
    if (currentGroupTitle === undefined && !classesData) {
      return;
    }
    setClassesSubItem(() => classesData[currentGroupTitle]);
    const tabsItems = classesData[currentGroupTitle]?.map((item, idx) => {
      const { title: label, id: key, classes, isActive } = item;
      const children = renderClassItem(classes, isActive);
      return { label, key, children };
    });

    setClassesSubTabs(() => tabsItems);
  }, [currentGroupTitle]);

  return (
    <Row>
      <Col span={4} className="p-2">
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={classesGroup}
          renderItem={(item, idx) => (
            <List.Item
              className="hover:cursor-pointer "
              onClick={() => {
                setCurrentGroupTitle(item);
              }}
            >
              <div
                className={
                  item === currentGroupTitle
                    ? "flex w-full h-full px-2 bg-blue-800 text-white hover:bg-blue-300 hover:text-white rounded-lg justify-start items-center"
                    : "flex w-full h-full px-2 hover:bg-blue-500 hover:text-white rounded-lg justify-start items-center"
                }
                style={{ height: "40px" }}
              >
                <p className="px-2">{item}</p>
              </div>
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <div className="flex p-4 ">
          <Tabs type="card" items={classesSubTabs} className="w-full h-full" />
        </div>
      </Col>
    </Row>
  );
};

export default FormClasses;
