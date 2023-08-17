import { Button, Form, Input, Row, Select, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Option } from "antd/lib/mentions";

const MaterialAddText = () => {
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    if (status === 0) {
      console.log(values);
      const context = {
        compCode: authUser.comp,
        code: values.code,
        name: values.name,
        detail: values.detail,
        parts: values.parts,
        unit: values.unit,

        updateBy: null,
        updateDate: null,
        type: values.type,
        file: null,
        accountNo: null,
        createBy: authUser.user.name,
        createDate: null,
      };
      axios.post(API_URL + "/api/Material/Create", context).then((res) => {
        console.log(res);
        message.success(`เพิ่มข้อมูลสำเร็จ`);
        // window.location.reload();
      });
    } else {
      message.error("ข้อมูลซ้ำกับในระบบ");
    }
  };
  const [form] = Form.useForm();
  const [code, setCode] = useState();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState(false);
  const [category, setCategory] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [notre, setNotre] = useState(true);

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

  const inputValue = (name) => (event) => {
    axios
      .get(
        API_URL + `/api/Material/GetSingleMaterialbyCode/${event.target.value}`
      )
      .then((res) => {
        if (res.data.data === null) {
          console.log("No", res.data.data);
          setDisabled(false);
          setNotre(true);
          setStatus(0);
        } else {
          console.log("Yes", res.data.data);
          setDisabled(true);
          message.warning(
            "มีอะไหล่นี้อยู่ในระบบแล้ว หากข้อมูลไม่ถูกต้อง กรุณากดแก้ไข"
          );
          setStatus(1);
          setNotre(false);
          form.setFieldsValue(res.data.data);
        }
      });
  };

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
        name="code"
        label="หมายเลขอะไหล่"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input value={code} onChange={inputValue("code")} />
      </Form.Item>

      <Form.Item
        name="name"
        label="ชื่ออะไหล่"
        rules={[
          {
            required: notre,
          },
        ]}
      >
        <Input disabled={disabled} />
      </Form.Item>
      {/* <Form.Item
        name="category"
        label="หมวดหมู่อะไหล่"
        rules={[
          {
            required: notre,
          },
        ]}
      >
        <Select placeholder="โปรดเลือกหมวดหมู่อะไหล่" disabled={disabled}>
          {category.sort().map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}
      <Form.Item
        name="detail"
        label="รายละเอียด"
        rules={[
          {
            required: notre,
          },
        ]}
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        name="parts"
        label="Parts"
        rules={[
          {
            required: notre,
          },
        ]}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        name="unit"
        label="หน่วยนับ"
        rules={[
          {
            required: true,
          },
        ]}
        disabled={disabled}
      >
        <Input disabled={disabled} />
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

export default MaterialAddText;
