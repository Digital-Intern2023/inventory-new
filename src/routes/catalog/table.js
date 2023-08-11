import { Button, Card, Modal, Popconfirm, Table, message } from "antd";
import { useEffect, useState } from "react";
import { Panel } from "react-instantsearch-dom";
import ManageCatalog from "./manage";
import axios from "axios";
import { API_URL } from "../../constanst";
import { set } from "lodash";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const TableCatalog = (id) => {
  const [data, setData] = useState();
  const [dataModal, setDataModal] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setDataModal(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "รหัสอะไหล่",
      dataIndex: "matCode",
      render: (text, record) => (
        <Link to={"/GroupMeterial/MaterialList/" + record.matCode}>
          {record.matCode}
        </Link>
      ),
    },
    {
      title: "ชื่ออะไหล่",
      dataIndex: "name",
    },
    {
      title: "จำนวน",
      dataIndex: "count",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <div>
          <Popconfirm
            title={`คุณต้องการลบ "${record.name}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .get(API_URL + "/api/GroupMaterial/Remove/" + record.id)
                .then((res) => {
                  console.log("delete category", res);
                  getDataTable();
                  message.success(`Delete ${record.name} success!`);
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
    axios
      .get(API_URL + "/api/GroupMaterial/GetMaterialByGroupId/" + id.id)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
  }
  useEffect(() => {
    getDataTable();
  }, []);
  return (
    <>
      {/* {JSON.stringify(data)} */}
      {data != null && data[0] != null ? (
        <Card
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          title={"รายการอะไหล่"}
          extra={
            <Button type="primary" onClick={() => showModal()}>
              + เพิ่มข้อมูลกลุ่มเครื่องจักร
            </Button>
          }
        >
          <Table columns={columns} dataSource={data} />
        </Card>
      ) : (
        <Card
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          title={"รายการอะไหล่"}
          type="inner"
          extra={
            <Button type="primary" onClick={() => showModal()}>
              + เพิ่มอะไหล่
            </Button>
          }
        >
          *ไม่มีรายการอะไหล่
        </Card>
      )}

      <Modal
        title={`อะไหล่ที่อยู่ในกลุ่มเครื่องจักร`}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={null}
        width={1000}
      >
        <ManageCatalog data={dataModal} />
      </Modal>
    </>
  );
};
export default TableCatalog;
