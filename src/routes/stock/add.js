import { Button, Form, Input, Modal, Row, Select, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { BarcodeOutlined } from "@ant-design/icons";
import BarcodeScannerComponent from "@steima/react-qr-barcode-scanner";
import { Option } from "antd/lib/mentions";

const StockAdd = () => {
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    setLoadings(true);
    if (status === 1) {
      console.log(values);
      const context = {
        compCode: authUser.comp,
        code: values.code,
        name: values.name,
        detail: values.detail,
        parts: values.parts,
        count: values.count,
        unit: values.unit,
        storeId: values.storeCode.toString(),
        refCode: values.refCode,
        categoryId: values.category,
        updateBy: null,
        updateDate: null,
        type: values.type,
        file: null,
        accountNo: null,
        createBy: authUser.user.name,
        createDate: null,
      };
      axios.post(API_URL + "/api/Stock/Create", context).then((res) => {
        console.log(res);
        setLoadings(false);

        window.location.reload();
      });
    } else {
      setLoadings(false);

      message.error(
        "ไม่มีข้อมูลอะไหล่นี้ในรายการ กรุณาเพิ่มข้อมูลในรายการแล้วลองอีกครั้ง"
      );
    }
  };
  const [form] = Form.useForm();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState(0);
  const [barcode, setBarcode] = useState();
  const [category, setCategory] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notre, setNotre] = useState(true);
  const [loadings, setLoadings] = useState(false);

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
    axios
      .get(API_URL + "/api/Store/GetStoreByUser/" + authUser.user.id)
      .then((res) => {
        console.log(res.data.data);
        setStore(res.data.data);
      });
  };
  useEffect(() => {
    getStore();
    getCategory();
    getSubCategory();
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
  const scanSuccess = (params) => {
    form.setFieldsValue({ code: params });
    console.log("bar", params);

    axios
      .get(
        `https://localhost:7106/api/Material/GetSingleMaterialbyCode/${params}`
      )
      .then((res) => {
        if (res.data.data === null) {
          console.log("No", res.data.data);
          message.error("ไม่มีข้อมูลอะไหล่ กรุณาเพิ่มข้อมูลในรายการ");
          setStatus(0);
          setDisabled(true);
          setNotre(true);
        } else {
          console.log("Yes", res.data.data);
          message.success("พบข้อมูลอะไหล่แล้ว กรุณากรอกจำนวนที่ต้องการเบิก");
          setStatus(1);

          form.setFieldsValue(res.data.data);
          setDisabled(true);
          setNotre(false);
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
                  scanSuccess(result.text);

                  message.success("สแกนสำเร็จแล้ว");

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
        name="category"
        label="หมวดหมู่อะไหล่"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="โปรดเลือกหมวดหมู่อะไหล่">
          {category.sort().map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
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
        name="count"
        label="จำนวน"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
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
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="refCode"
        label="เลขใบเบิก"
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
          <Button
            loading={loadings}
            type="primary"
            className="gx-mb-0"
            htmlType="submit"
          >
            บันทึก
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default StockAdd;
