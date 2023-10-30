import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";

const OrderEdit = (data) => {
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
      count: values.count,
      unit: values.unit,
      storeCode: values.storeCode,
      status: values.status,
      updateBy: null,
      updateDate: null,
      type: values.type,
      file: null,
      accountNo: null,
      createBy: authUser.user.name,
      createDate: null,
    };
    axios.post(API_URL + "/api/Stock/Update", context).then((res) => {
      console.log(res);
      message.success(`อัปเดตข้อมูลสำเร็จ`);
      // window.location.reload();
    });
  };
  // set value in modal
  form.setFieldsValue(data.data);

  const [store, setStore] = useState([]);

  const getStore = () => {
    axios.get(API_URL + "/api/Store/GetStore").then((res) => {
      console.log(res.data.data);
      setStore(res.data.data);
    });
  };
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
      {/* <p>{JSON.stringify(data.data)}</p> */}
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
        name="count"
        label="จำนวน"
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
      <Form.Item
        name="storeCode"
        label="Store"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="กรุณาเลือก store">
          {store.sort().map((item) => (
            <Select.Option value={item.code}>{item.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="สถานะ"
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

export default OrderEdit;
