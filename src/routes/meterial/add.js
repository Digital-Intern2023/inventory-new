import { Button, Form, Input, Modal, Row, Select, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "@steima/react-qr-barcode-scanner";
import { BarcodeOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import moment from "moment";

const MaterialAdd = () => {
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    if (status === 0) {
      console.log(values);
      const context = {
        id: authUser.id,
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
        message.success("เพิ่มข้อมูลอะไหล่กลางสำเร็จแล้ว");
        // window.location.reload();
      });
    } else {
      message.error("ข้อมูลซ้ำกับในระบบ");
    }
  };
  const [form] = Form.useForm();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState();
  const [barcode, setBarcode] = useState();
  const [isStart, setIsStart] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notre, setNotre] = useState(true);
  const [category, setCategory] = useState();

  const scanSuccess = (params) => {
    form.setFieldsValue({ code: params });
    console.log("bar", params);
    axios
      .get(
        API_URL + `/api/Material/GetSingleMaterialbyCode/${params}`
      )
      .then((res) => {
        if (res.data.data === null) {
          console.log("No", res.data.data);
          setDisabled(false);
          message.warning("ยังไม่มีข้อมูลอะไหล่นี้ กรุณาเพิ่มข้อมูล");
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
  function getStore() {
    axios.get(API_URL + "/api/Store/GetStore").then((res) => {
      console.log(res.data.data);
      setStore(res.data.data);
    });
  }
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
  useEffect(() => {
    getStore();
    getCategory();
  }, []);
  const showModal = () => {
    setIsStart(!isStart);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsStart(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsStart(false);
    setIsModalOpen(false);
  };
  form.setFieldsValue({ code: barcode });
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
        disabled={disabled}
      >
        <Button icon={<BarcodeOutlined />} onClick={showModal}>
          {!isStart ? "สแกน" : "หยุด"}
        </Button>
        {isStart ? (
          <Modal
            title={"สแกนเลขอะไหล่"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <BarcodeScannerComponent
              width={"100%"}
              height={"100%"}
              autoFocus={true}
              onUpdate={(err, result) => {
                console.log(err, result);

                if (result) {
                  setBarcode(result.text);
                  message.success("สแกนสำเร็จ");
                  scanSuccess(result.text);
                  setIsStart(false);
                  setIsModalOpen(false);
                }
              }}
            />
          </Modal>
        ) : null}
        <Input value={barcode} disabled />
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
            required: notre,
          },
        ]}
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

export default MaterialAdd;
