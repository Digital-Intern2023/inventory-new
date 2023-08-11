import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Segmented,
  Spin,
  Table,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, authUser } from "../../constanst";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import MaterialAdd from "./add";
import MaterialEdit from "./Edit";

import MaterialAddText from "./addtext";
import SignIn from "../../containers/SignIn";

const Meterial = () => {
  const [data, setData] = useState([]);
  const [arrt1, setArrt1] = useState("");
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("Barcode");
  const [dataModal, setDataModal] = useState([]);

  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});

  const [searchedText, setSearchedText] = useState("");
  const tableLoading = {
    spinning: loading,
    indicator: <Spin type="loading" />,
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "หมายเลขอะไหล่",
      dataIndex: "code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.code).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.detail).toLowerCase().includes(value.toLowerCase()) ||
          String(record.parts).toLowerCase().includes(value.toLowerCase()) ||
          String(record.unit).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record.updatedBy)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.storeName).toLowerCase().includes(value.toLowerCase())
        );
      },

      width: 200,
    },
    {
      title: "ชื่ออะไหล่",
      dataIndex: "name",

      width: 150,
    },
    {
      title: "รายละเอียด",
      dataIndex: "detail",

      width: 300,
    },
    {
      title: "Parts",
      dataIndex: "parts",

      width: 100,
    },
    {
      title: "หน่วยนับ",
      dataIndex: "unit",

      width: 100,
    },
    {
      title: "สถานะ",
      dataIndex: "status",

      width: 100,
    },
    {
      title: "ผู้อัปเดต",
      dataIndex: "updateBy",

      width: 150,
    },
    // {
    //   title: "Store",
    //   dataIndex: "storeName",
    //   key: "storeName",
    //   filters: arrt1,
    //   filteredValue: filteredInfo.storeName || null,
    //   onFilter: (value, record) => record.storeName.includes(value),
    //   sorter: (a, b) => a.storeName.length - b.storeName.length,
    //   sortOrder: sortedInfo.columnKey === "storeName" ? sortedInfo.order : null,
    //   ellipsis: true,
    //   width: 150,
    // },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={() => showModal1(record)}
          ></Button>

          <Popconfirm
            title={`คุณต้องการลบ "${record.name}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .get(API_URL + "/api/Material/Remove/" + record.id)
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
  const getDataTable = () => {
    setLoading(true);
    axios.get(API_URL + "/api/Material/GetMaterial").then((res) => {
      setArrt1(res.data.store);
      setData(res.data.data);
      setLoading(false);
    });
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const showModal1 = (record) => {
    setDataModal(record);
    setOpen1(true);
  };
  const handleOk1 = () => {
    setTimeout(() => {
      setOpen1(false);
    }, 3000);
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    getDataTable();
  }, []);
  return (
    <>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ verticalAlign: "middle" }}
            title="รายการข้อมูลอะไหล่กลาง"
            extra={
              <div>
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  onClick={showModal}
                  icon={<PlusOutlined />}
                >
                  <span>เพิ่มข้อมูล</span>
                </Button>
              </div>
            }
          >
            <Input.Search
              placeholder="Search"
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
            <Table
              loading={tableLoading}
              className="gx-table-responsive"
              onChange={handleChange}
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 500 }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        open={open}
        title="เพิ่มข้อมูลอะไหล่กลาง"
        onOk={handleOk}
        onCancel={handleCancel}
        // width={1000}
        footer={null}
      >
        <Segmented
          options={["Barcode", "กรอกหมายเลข"]}
          value={value}
          onChange={setValue}
          style={{ marginBottom: "10px" }}
        />
        <div>{value === "Barcode" ? <MaterialAdd /> : <MaterialAddText />}</div>
      </Modal>

      <Modal
        open={open1}
        title="แบบฟอร์มแก้ไขข้อมูล"
        onOk={handleOk1}
        onCancel={handleCancel1}
        // width={1000}
        footer={null}
      >
        <MaterialEdit data={dataModal} />
      </Modal>
    </>
  );
};

export default Meterial;
