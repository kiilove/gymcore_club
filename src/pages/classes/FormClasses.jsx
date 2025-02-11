import { Card, Col, List, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";

const FormClasses = ({ classesData, onSave }) => {
  const [classesGroup, setClassesGroup] = useState([]);
  const [classesSubItem, setClassesSubItem] = useState([]);
  const [classesSubTabs, setClassesSubTabs] = useState([]);
  const [currentGroupTitle, setCurrentGroupTitle] = useState(undefined);

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
      const { title: label, id: key } = item;
      return { label, key };
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
                console.log(item);
                setCurrentGroupTitle(item);
              }}
            >
              <div
                className="flex w-full h-full px-2 hover:bg-blue-300 hover:text-white rounded-lg justify-start items-center"
                style={{ height: "40px" }}
              >
                <p className="px-2">{item}</p>
              </div>
            </List.Item>
          )}
        />
      </Col>
      <Col span={18}>
        <div className="flex p-4">
          <Tabs type="card" items={classesSubTabs} />
        </div>
      </Col>
    </Row>
  );
};

export default FormClasses;
