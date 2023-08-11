import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Row, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../constanst";

const SignIn = () => {
  // const [user,setUser] =  useState({ username : "" , pass : ""});

  useEffect(() => {});
  const [loadings, setLoadings] = useState(false);
  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    setLoadings(true);
    // console.log(values);
    const newData = {
      username: values.username,
      password: values.password,
    };

    axios
      .post(API_URL + "/api/Auth/login", newData)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data));
          // console.log("AUTH : " + authUser);
          setLoadings(false);
          window.location.assign("/");
        } else {
          /// call api error
          setLoadings(false);
          window.alert(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoadings(false);
          if (err.response.status === 401) {
            message.error("ข้อมูลลงชื่อเข้าใช้ไม่ถูกต้อง");
          }
          console.log(err.response.status);
        }
      });
  };

  return (
    <div>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
        className="container"
      >
        <Card style={{ width: "400px" }}>
          <Form.Item className="align-center">
            <Row
              type="flex"
              justify="center"
              align="middle"
              className="container"
            >
              <img src="/12.png" align="middle" alt="signinlogo" />
              <span>เข้าสู่ระบบด้วย ชื่อผู้ใช้งาน และ รหัสผ่านของ SCG</span>
            </Row>
          </Form.Item>
          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="gx-signin-form gx-form-row0"
          >
            <Form.Item
              // initialValue="demo@example.com"
              rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
              name="username"
            >
              <Input placeholder={"ชื่อผู้ใช้"} addonAfter={"@scg.com"} />
            </Form.Item>
            <Form.Item
              // initialValue="demo#123"
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
              name="password"
            >
              <Input type="password" placeholder="รหัสผ่าน" />
            </Form.Item>
            {/* <Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item> */}
            <Form.Item className="align-center">
              <Row
                type="flex"
                justify="center"
                align="middle"
                className="container"
              >
                <Button
                  loading={loadings}
                  type="primary"
                  className="gx-mb-0"
                  htmlType="submit"
                >
                  เข้าสู่ระบบ
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default SignIn;
