import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import moment from "moment";
import SubCategoryEdit from "./Edit";
import UserManageEdit from "./Edit";
import SignIn from "../../containers/SignIn";

const UserManage = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataModal, setDataModal] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",

      width: 360,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      width: 360,
    },
    {
      title: "Action",
      key: "action",
      width: 360,
      render: (record) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={() => {
              showModal(record);
            }}
          >
            แก้ไข
          </Button>
        </div>
      ),
    },
  ];

  const setDataTable = () => {
    axios.get(API_URL + "/api/User/Get").then((res) => {
      console.log("outputget user", res);
      setData(res.data.user);
    });
  };
  const showModal = (record) => {
    setDataModal({
      id: record.id,
      name: record.name,
      category: record.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setDataTable();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    setDataTable();
  }, []);
  return (
    <>
      {/* {JSON.stringify(dataModal)} */}
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card title="จัดการผู้ใช้งานระบบ">
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={data}
            />
          </Card>
          <Modal
            title={`แก้ไขการมองเห็นข้อมูล`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <UserManageEdit data={dataModal.id} />
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default UserManage;
