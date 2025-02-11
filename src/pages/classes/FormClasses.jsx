import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const FormClasses = ({ classesData, onSave }) => {
  const [classesGroup, setClassesGroup] = useState([]);

  useEffect(() => {
    if (!classesData) {
      return;
    }
    setClassesGroup(() => Object.keys(classesData));
  }, [classesData]);

  return (
    <Row>
      <Col span={6}>카테고리</Col>
      <Col span={18}>하위</Col>
    </Row>
  );
};

export default FormClasses;
