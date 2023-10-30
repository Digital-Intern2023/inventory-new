import { Button, Form, Input, Modal, Row, Select, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import { BarcodeOutlined } from "@ant-design/icons";
import BarcodeScannerComponent from "@steima/react-qr-barcode-scanner";

const OrderAdd = () => {
  const onFinishFailed = (errorInfo) => {};
  const onFinish = (values) => {
    setLoadings(true);
    if (status === 1) {
      console.log(values);
      const context = {
        code: values.code,
        compCode: authUser.comp,
        storeId: values.storeId.toString(),
        count: values.amount,
        use: values.use,
        createBy: authUser.user.name,
      };
      console.log(context);
      axios.post(API_URL + "/api/Order/Create", context).then((res) => {
        console.log(res);
        if (res.data.data != null) {
          // window.location.reload();
          setLoadings(false);
          message.success(`เพิ่มข้อมูลสำเร็จ`);
      } else {
          message.error("จำนวนอะไหล่มีไม่พอให้ใช้บริการ");
          setLoadings(false);
        }
        // window.location.reload();
      });
    } else {
      setLoadings(false);

      message.error(
        "ไม่มีข้อมูลอะไหล่นี้ในคลัง กรุณาเพิ่มข้อมูลในคลังแล้วลองอีกครั้ง"
      );
    }
  };
  const [form] = Form.useForm();
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState(0);
  const [barcode, setBarcode] = useState();
  const [isStart, setIsStart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState();
  const [disabled, setDisabled] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [notre, setNotre] = useState(true);
  const [condition, setCondition] = useState({
    code: "",
    storeId: "",
  });
  const [plant, setPlant] = useState([]);
  const [plantsta, setPlantsta] = useState(0);
  function getStore() {
    axios
      .get(API_URL + "/api/Store/GetStoreByUser/" + authUser.user.id)
      .then((res) => {
        console.log(res.data.data);
        setStore(res.data.data);
      });
  }
  const getPlant = () => {
    axios.get(API_URL + "/api/Structure/GetPlant").then((res) => {
      console.log(res.data.data);
      setPlant(res.data.data);
      setPlantsta(1);
    });
  };
  useEffect(() => {
    getStore();
    getPlant();
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
    setCondition({ code: params });
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const inputValue = (name) => (event) => {
    if (condition.code != "") {
      axios
        .get(
          API_URL + `/api/Stock/GetSinglebyCodeAndStoreId/${
            condition.code
          }/${event.toString()}/${authUser.user.id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.data === null) {
            setDisabled(true);
            setStatus(0);

            form.setFieldsValue({ name: null, detail: null, count: null });
            console.log("No", res.data.data);
            message.error(
              "ไม่พบข้อมูลอะไหล่แล้ว กรุณาเพิ่มข้อมูลอะไหล่ในคลังอะไหล่ก่อน"
            );
          } else {
            setDisabled(true);
            message.success("พบข้อมูลอะไหล่แล้ว กรุณากรอกจำนวนที่ต้องการเบิก");
            setStatus(1);

            console.log("Yes", res.data.data);

            form.setFieldsValue({
              name: res.data.data.name,
              detail: res.data.data.detail,
              count: res.data.data.count,
            });
          }
        });
    }
  };
  console.log("store", store);
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
            title={"สแกนหมายเลขอะไหล่"}
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
                  message.success(
                    "สแกนสำเร็จแล้ว กรุณาเลือก Store ที่ต้องการเบิก"
                  );

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
        name="storeId"
        label="Store"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="กรุณาเลือก store"
          onChange={inputValue("storeId")}
          showSearch
          optionFilterProp="children"
          onSearch={onSearch}
        >
          {store.sort().map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="name" label="ชื่ออะไหล่">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item name="detail" label="รายละเอียด">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item name="count" label="จำนวนในคลัง">
        <Input type="number" disabled={disabled} />
      </Form.Item>
      <Form.Item name="amount" label="จำนวนที่ต้องการเบิก">
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="use"
        label="ใช้ที่โรงงาน"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="กรุณาเลือกโรงงาน"
          showSearch
          optionFilterProp="children"
          onSearch={onSearch}
        >
          {plantsta === 1
            ? plant.sort().map((item) => (
                <Select.Option key="a" value={item.code}>
                  {item.code + " " + item.name}
                </Select.Option>
              ))
            : "query"}
        </Select>
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

export default OrderAdd;
