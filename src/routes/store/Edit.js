import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import Category from ".";
import { useEffect, useState } from "react";

const StoreEdit = (data) => {
  const [division, setDivision] = useState([]);
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => { };
  const onFinish = (values) => {
    const store = {
      id: values.id,
      name: values.name,
      divisionCode:values.divisionCode
    };
    axios.post(API_URL + "/api/Store/Update", store).then((res) => {
      console.log(res);
      // window.location.reload();
      message.success(`แก้ไขข้อมูล Store ${store.name} สำเร็จ`);
    });
  };

  function getDivision() {
    axios.get(API_URL + `/api/store/GetDivision`).then((res) => {
      setDivision(res.data.data);
    })
  }
  form.setFieldsValue({ id: data.data.id });
  form.setFieldsValue({ name: data.data.name });
  form.setFieldsValue({ divisionCode: data.data.divisionCode });
  useEffect(() => {
    getDivision()
  }, [])
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="gx-signin-form gx-form-row0"
    >
      {JSON.stringify(data)}
      <Form.Item
        style={{ display: "none" }}
        name="id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="ชื่อ Store"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="divisionCode"
        label="ภาค"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="กรุณาเลือกภาค">
          {division.map((item) => (
            <Select.Option value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item className="align-center">
        <Row type="flex" justify="center" align="middle" className="container">
          <Button type="primary" className="gx-mb-0" htmlType="submit">
            บันทึก
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default StoreEdit;
