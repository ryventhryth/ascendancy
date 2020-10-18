import { Card, Col, Row } from "antd";
import React from "react";

import { RegisterForm } from "./RegisterForm";

const centered = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export const RegisterPage = () => {
  return (
    <Row style={{ height: "100vh", width: "100%", background: "#ececec" }}>
      <Col span={24} style={centered}>
        <Card title="Register page" bordered style={{ minWidth: "40%" }}>
          <RegisterForm />
        </Card>
      </Col>
    </Row>
  );
};
