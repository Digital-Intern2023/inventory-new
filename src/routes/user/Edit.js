import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";
import moment from "moment";

const UserManageEdit = (data) => {
  const [user, setUser] = useState();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    var context = {
      uid : values.id,
      status : values.status
    }

    axios.post(API_URL+`/api/User/Update`,context).then((res)=>{
      console.log(res.data.message);

      message.success("อัปเดตข้อมูลสำเร็จ")
      // window.location.reload();
    })
  };
  function GetUser() {
    axios.get(API_URL + `/api/User/GetbyUserId/${data.data}`).then((res) => {
      console.log("res this user is", res)
      setUser(res.data.user)
      form.setFieldsValue({ id: res.data.user.id });
      form.setFieldsValue({ status: res.data.user.status });

    })
  }
  useEffect(() => {
    GetUser();
  }, []);
  return (
    <Form
      form={form}

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      initialValues={{ remember: true }}
      className="gx-signin-form gx-form-row0"
    >
      {/* {JSON.stringify(user)} */}
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
        name="status"
        label="การมองเห็นข้อมูล"
        rules={[
          {
            required: true,
          },
        ]}
      >

        <Select placeholder="กรุณาเลือกโรงงาน">
          <Select.Option key={0} value={"Member"}>
            ดูเฉพาะ Store ที่ดูแล
          </Select.Option>
          <Select.Option key={1} value={"Admin"}>
            ดู Store ทั้งหมด
          </Select.Option>
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

export default UserManageEdit;
