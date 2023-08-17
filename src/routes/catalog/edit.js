import { Button, Form, Input, Row, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";

const MachineEdit = (data) => {
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    const category = {
      id: values.id,
      name: values.name,
      createBy: authUser.id,
    };
    axios.post(API_URL + "/api/Machine/Update", category).then((res) => {
      console.log(res);
      message.success(`แก้ไขข้อมุล ${values.name} สำเร็จแล้ว`);
      // window.location.reload();
    });
  };

  form.setFieldsValue({ id: data.data.id });
  form.setFieldsValue({ name: data.data.name });
  return (
    <>
      {/* {JSON.stringify(data)} */}

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
          label="ชื่อเครื่องจักร"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="align-center">
          <Row
            type="flex"
            justify="center"
            align="middle"
            className="container"
          >
            <Button type="primary" className="gx-mb-0" htmlType="submit">
              บันทึก
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
export default MachineEdit;
