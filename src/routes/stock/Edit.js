import { Button, Form, Input, Row, Select } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";
import moment from "moment";

import { Option } from "antd/lib/mentions";

const StockEdit = (data) => {
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    const context = {
      id: values.id,
      compCode: authUser.comp,
      code: values.code,
      categoryId: values.categoryId,

      name: values.name,
      detail: values.detail,
      parts: values.parts,
      count: values.count,
      unit: values.unit,
      storeCode: values.storeCode,

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
      window.location.reload();
    });
  };
  // set value in modal
  form.setFieldsValue(data.data);

  const [store, setStore] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const getCategory = () => {
    axios.get(API_URL + "/api/Category/GetCategory").then((res) => {
      console.log("outputget category", res);
      res.data.data.map((el) => {
        let date = moment(new Date(el.createDate));
        el.createDate = date.format("DD/MM/YYYY");
      });
      setCategory(res.data.data);
    });
  };
  const getSubCategory = () => {
    axios.get(API_URL + "/api/subCategory/GetSubCategory").then((res) => {
      console.log("outputget category", res);
      res.data.data.map((el) => {
        let date = moment(new Date(el.createDate));
        el.createDate = date.format("DD/MM/YYYY");
      });
      setSubCategory(res.data.data);
    });
  };
  const getStore = () => {
    axios.get(API_URL + "/api/Store/GetStore").then((res) => {
      console.log(res.data.data);
      setStore(res.data.data);
    });
  };

  useEffect(() => {
    getStore();
    getCategory();
    getSubCategory();
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
        name="categoryId"
        label="หมวดหมู่อะไหล่"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="โปรดเลือกหมวดหมู่อะไหล่">
          {category.sort().map((item) => (
            <Select.Option value={item.id}>{item.name}</Select.Option>
          ))}
        </Select>
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
            <Select.Option value={item.id}>{item.name}</Select.Option>
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
        <Select>
          <Option value="AT">ใช้งาน</Option>
          <Option value="CN">ยกเลิก</Option>
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

export default StockEdit;
