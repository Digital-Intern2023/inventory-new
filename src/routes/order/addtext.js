import { Button, Form, Input, Row, Select, message } from "antd";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import { values } from "lodash";

const OrderAddText = () => {
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
          setLoadings(false);
        message.success(`เพิ่มข้อมูลสำเร็จ`);
        // window.location.reload();
        } else {
          setLoadings(false);
          message.error("จำนวนอะไหล่มีไม่พอให้ใช้บริการ");
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
  const [code, setCode] = useState();
  const [plant, setPlant] = useState([]);
  const [store, setStore] = useState([]);
  const [status, setStatus] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loadings, setLoadings] = useState(false);
  var [condition, setCondition] = useState({
    code: "",
    storeId: "",
  });
  const [mat, setMat] = useState();
  function getPlant() {
    axios.get(API_URL + "/api/Structure/GetPlant").then((res) => {
      console.log(res.data.data);
      setPlant(res.data.data);
    });
  }
  const getMat = () => {
    axios
      .get(API_URL + "/api/Stock/GetStockDistinct/" + authUser.user.id)
      .then((res) => {
        console.log("jaa", res.data.data);
        setMat(res.data.data);
      });
  };
  function getStore() {
    axios
      .get(API_URL + "/api/Store/GetStoreByUser/" + authUser.user.id)
      .then((res) => {
        console.log(res.data.data);
        setStore(res.data.data);
      });
  }
  const onSearch = (value) => {
    console.log("search:", value);
  };
  useEffect(() => {
    getMat();
    getPlant();
    getStore();
  }, []);

  const inputValue = (name) => (event) => {
    console.log(event);
    if (name == "code") {
      // message.warning("กรุณาเลือก Store ที่ต้องการเบิก");
      setCondition({ ...condition, ["code"]: event });
    }
    if (name == "storeId") {
      setCondition({ ...condition, ["storeId"]: event });
    }

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
  return (
    <>
      {/* {JSON.stringify(store)}
      {JSON.stringify(condition)}
      {JSON.stringify(condition.code)}
      {JSON.stringify(condition.storeId)} */}
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
          <Select
            placeholder="เลือกอะไหล่"
            showSearch
            optionFilterProp="children"
            onSearch={onSearch}
            onChange={inputValue("code")}
          >
            {mat
              ? mat.sort().map((item) => (
                  <Select.Option key={item.id} value={item.code}>
                    {item.code + " " + item.name}
                  </Select.Option>
                ))
              : null}
          </Select>
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
            {plant.sort().map((item) => (
              <Select.Option key="B" value={item.code}>
                {item.code + " " + item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="align-center">
          <Row
            type="flex"
            justify="center"
            align="middle"
            className="container"
          >
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
    </>
  );
};

export default OrderAddText;
