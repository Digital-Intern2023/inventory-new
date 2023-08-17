import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  message,
} from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MachineEdit from "./edit";
import SignIn from "../../containers/SignIn";

const Catalog = () => {
  const [dataTable, setDataTable] = useState();
  const [dataModal, setDataModal] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (record) => {
    setDataModal({ id: record.id, name: record.name });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    getDataTable();
    setIsModalOpen(false);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    getDataTable();
    setIsModalOpen1(false);
  };

  const columns = [
    {
      title: "ชื่อเครื่องจักร",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/Machine/Detail/${encodeURIComponent(record.id)}`}>
          {record.name}
        </Link>
      ),
      width: 360,
    },
    {
      title: "วันที่บันทึก",
      dataIndex: "createDate",
      key: "createDate",
      width: 360,
    },
    {
      title: "Action",
      key: "action",

      width: 360,
      render: (text, record) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={() => showModal(record)}
          ></Button>

          <Popconfirm
            title={`คุณต้องการลบหมวดหมู่ "${record.name}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .post(API_URL + "/api/Machine/Remove/" + record.id)
                .then((res) => {
                  console.log("delete category", res);
                  message.success(`Delete ${record.name}!`);
                  getDataTable();
                });
            }}
          >
            <Button
              style={{ color: "#FF4141", textAlign: "right" }}
              icon={<DeleteOutlined />}
              type="link"
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  function getDataTable() {
    axios.get(API_URL + "/api/Machine/GetMachine").then((res) => {
      console.log("outputget Machine", res);
      setDataTable(res.data.machine);
    });
  }

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    console.log(values);
    const category = {
      name: values.name,
      createBy: authUser.id,
    };
    axios.post(API_URL + "/api/Machine/Create", category).then((res) => {
      console.log(res);
      getDataTable();
      message.success(`เพิ่มเครื่องจักร ${values.name} สำเร็จ`);
      setIsModalOpen1(false);
    });
  };
  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    getDataTable();
  }, []);
  return (
    <>
      {/* {JSON.stringify(dataTable)} */}
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="รายการเครื่องจักร"
            extra={
              <Button type="primary" onClick={() => showModal1()}>
                + เพิ่มข้อมูล
              </Button>
            }
          >
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={dataTable}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={`แก้ไขข้อมูลชื่อเครื่องจักร ${dataModal.name}`}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
      >
        <MachineEdit data={dataModal} />
      </Modal>
      <Modal
        title={`สร้างชื่อเครื่องจักร`}
        open={isModalOpen1}
        onCancel={handleCancel1}
        onOk={handleOk1}
        footer={null}
      >
        <Form
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <Form.Item
            name="name"
            label="ชื่อเครื่องจักร"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="ระบุชื่อเครื่องจักร" />
          </Form.Item>
          <Form.Item className="align-center">
            <Row
              type="flex"
              justify="center"
              align="middle"
              className="container"
            >
              <Button type="primary" className="gx-mb-0" htmlType="submit">
                สร้าง
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Catalog;
