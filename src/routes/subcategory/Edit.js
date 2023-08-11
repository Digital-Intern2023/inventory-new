import { Button, Form, Input, Row, Select } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";
import moment from "moment";

const SubCategoryEdit = (data) => {
  const [category, setCategory] = useState([]);

  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    const category = {
      id: values.id,
      CategoryId: values.category,
      name: values.name,
      createBy: authUser.id,
    };
    axios.post(API_URL + "/api/SubCategory/Update", category).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  function getCategory() {
    axios.get(API_URL + "/api/Category/GetCategory").then((res) => {
      console.log("outputget category", res);
      res.data.data.map((el) => {
        let date = moment(new Date(el.createDate));
        el.createDate = date.format("DD/MM/YYYY");
      });
      setCategory(res.data.data);
    });
  }
  form.setFieldsValue({ id: data.data.id });
  form.setFieldsValue({ name: data.data.name });
  form.setFieldsValue({ category: data.data.category });
  useEffect(() => {
    getCategory();
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
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={data.data.category}
        name="category"
        label="หมวดหมู่วัสดุ"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          {category.sort().map((item) => (
            <Select.Option value={item.id}>{item.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="ชื่อประเภทวัสดุ"
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

export default SubCategoryEdit;
