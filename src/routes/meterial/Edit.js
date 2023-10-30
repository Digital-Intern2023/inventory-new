import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";

const MaterialEdit = (data) => {
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    const context = {
      id: values.id,
      compCode: authUser.comp,
      code: values.code,
      name: values.name,
      detail: values.detail,
      parts: values.parts,
      unit: values.unit,

      status: values.status,
      updateBy: null,
      updateDate: null,
      type: values.type,
      file: null,
      accountNo: null,
      createBy: authUser.user.name,
      createDate: null,
    };
    axios.post(API_URL + "/api/Material/Update", context).then((res) => {
      console.log(res);
      // window.location.reload();
      message.success(`แก้ไขข้อมุล ${values.name} สำเร็จแล้ว`);
    });
  };

  // set value in modal
  form.setFieldsValue(data.data);

  const [store, setStore] = useState([]);

  function getStore() {
    axios.get(API_URL + "/api/Store/GetStore").then((res) => {
      console.log(res.data.data);
      setStore(res.data.data);
    });
  }
  useEffect(() => {
    getStore();
  }, []);
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
      <Form.Item
        style={{ display: "none" }}
        name="id"
        label="Id"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="หมายเลขอะไหล่"
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
        label="ชื่ออะไหล่"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="detail"
        label="รายละเอียด"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="parts"
        label="Parts"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="unit"
        label="หน่วยนับ"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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

export default MaterialEdit;
