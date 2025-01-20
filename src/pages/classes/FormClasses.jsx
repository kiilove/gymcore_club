import React from "react";
import { Tabs, Card, Row, Col } from "antd";

const { TabPane } = Tabs;

const FormClasses = ({ products }) => {
  const renderProducts = (products) => (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col span={8} key={product.id}>
          <Card title={product.title} bordered={false}>
            <p>{product.description}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Tabs defaultActiveKey="1" centered type="card">
      {Object.keys(products).map((category, index) => (
        <TabPane tab={category} key={index + 1}>
          {renderProducts(products[category])}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default FormClasses;
