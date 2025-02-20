// FormMember.jsx
import React, { useState } from "react";
import { Steps, Row, Col } from "antd";

import FormPersonalInfo from "./FormPersonalInfo";
import FormContract from "./FormContract";
import FormPayment from "./FormPayment";

const { Step } = Steps;

const FormMember = ({ initialValues = {}, onSubmit }) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(initialValues);

  const steps = [
    {
      title: "기본 정보 및 주소",
      content: (
        <FormPersonalInfo
          initialValues={formData}
          onNext={(values) => {
            setFormData({ ...formData, ...values });
            setCurrent(1);
          }}
        />
      ),
    },
    {
      title: "계약 정보",
      content: (
        <FormContract
          initialValues={formData}
          onNext={(values) => {
            setFormData({ ...formData, ...values });
            setCurrent(2);
          }}
          onPrev={() => setCurrent(0)}
        />
      ),
    },
    {
      title: "결제 정보",
      content: (
        <FormPayment
          initialValues={formData}
          onSubmit={(values) => {
            const finalData = { ...formData, ...values };
            onSubmit(finalData);
          }}
          onPrev={() => setCurrent(1)}
        />
      ),
    },
  ];

  return (
    <Row justify="center">
      <Col span={24}>
        <Steps
          current={current}
          style={{ marginBottom: 24 }}
          onChange={(newCurrent) => setCurrent(newCurrent)}
        >
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>
      </Col>
      <Col span={24}>{steps[current].content}</Col>
    </Row>
  );
};

export default FormMember;
