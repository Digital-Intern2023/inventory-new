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
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import OrderAdd from "./add";
import OrderEdit from "./Edit";

import OrderAddText from "./addtext";

const Order = () => {
  const [data, setData] = useState([]);
  const [arrt1, setArrt1] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState("Barcode");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchedText, setSearchedText] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const tableLoading = {
    spinning: loading,
    indicator: <Spin type="loading" />,
  };
  function getDataTable() {
    setLoading(true);
    axios.get(API_URL + "/api/Order/Get/" + authUser.user.id).then((res) => {
      // console.log(res)
      setArrt1(res.data.store);
      setData(res.data.data);
      setLoading(false);
    });
  }

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
    getDataTable();
    setOpen(false);
  };

  // const showModal1 = (record) => {
  //   setDataModal(record);
  //   setOpen1(true);
  // };
  const handleOk1 = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      setOpen1(false);
    }, 3000);
  };
  const handleCancel1 = () => {
    getDataTable();
    setOpen1(false);
  };

  useEffect(() => {
    getDataTable();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columntable = [
    // {
    //   title: "เลขที่ใบเบิกจากศูนย์",
    //   dataIndex: "refCode",
    //   key: "refCode",
    //   sorter: (a, b) => a.refCode.length - b.refCode.length,
    //   sortOrder: sortedInfo.columnKey === "refCode" ? sortedInfo.order : null,
    //   ellipsis: true,
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     return (
    //       String(record.code).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.name).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.detail).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.unit).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.storeName)
    //         .toLowerCase()
    //         .includes(value.toLowerCase()) ||
    //       String(record.plantName)
    //         .toLowerCase()
    //         .includes(value.toLowerCase()) ||
    //       String(record.updatedBy)
    //         .toLowerCase()
    //         .includes(value.toLowerCase()) ||
    //       String(record.createBy).toLowerCase().includes(value.toLowerCase())
    //     );
    //   },

    //   width: 175,
    // },
    {
      title: "หมายเลขอะไหล่",
      dataIndex: "code",

      key: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      sortOrder: sortedInfo.columnKey === "code" ? sortedInfo.order : null,
      ellipsis: true,

      width: 175,
    },
    {
      title: "ชื่ออะไหล่",
      dataIndex: "name",

      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,

      width: 150,
    },
    {
      title: "รายละเอียด",
      dataIndex: "detail",

      key: "detail",
      sorter: (a, b) => a.detail.length - b.detail.length,
      sortOrder: sortedInfo.columnKey === "detail" ? sortedInfo.order : null,
      ellipsis: true,

      width: 200,
    },
    {
      title: "จำนวน",
      dataIndex: "count",

      key: "count",
      sorter: (a, b) => a.count.length - b.count.length,
      sortOrder: sortedInfo.columnKey === "count" ? sortedInfo.order : null,
      ellipsis: true,

      width: 100,
    },
    {
      title: "หน่วยนับ",
      dataIndex: "unit",
      key: "unit",
      sorter: (a, b) => a.unit.length - b.unit.length,
      sortOrder: sortedInfo.columnKey === "unit" ? sortedInfo.order : null,
      ellipsis: true,

      width: 100,
    },
    {
      title: "Store",
      dataIndex: "storeName",
      key: "storeName",
      filters: arrt1,
      filteredValue: filteredInfo.storeName || null,
      onFilter: (value, record) => record.storeName.includes(value),
      sorter: (a, b) => a.storeName.length - b.storeName.length,
      sortOrder: sortedInfo.columnKey === "storeName" ? sortedInfo.order : null,
      ellipsis: true,
      width: 150,
    },
    {
      title: "ใช้งานที่",
      dataIndex: "plantName",

      width: 150,

      key: "plantName",
      filters: arrt1,
      filteredValue: filteredInfo.plantName || null,
      onFilter: (value, record) => record.plantName.includes(value),
      sorter: (a, b) => a.name.plantName - b.plantName.length,
      sortOrder: sortedInfo.columnKey === "plantName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "ผู้อัปเดต",
      dataIndex: "createBy",

      key: "createBy",
      sorter: (a, b) => a.createBy.length - b.createBy.length,
      sortOrder: sortedInfo.columnKey === "createBy" ? sortedInfo.order : null,
      ellipsis: true,

      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <div>
          {/* <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={()=>showModal1(record)}
          ></Button> */}

          <Popconfirm
            title={`คุณต้องการลบ "${record.refCode}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .get(API_URL + "/api/Order/Remove/" + record.id)
                .then((res) => {
                  console.log("delete category", res);
                  getDataTable();
                  message.success(`Delete ${record.name} Successfully!`);
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

  return (
    <>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ verticalAlign: "middle" }}
            title="เบิกอะไหล่ออกจากศูนย์"
            extra={
              <div>
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  onClick={showModal}
                  icon={<PlusOutlined />}
                >
                  <span>เบิกอะไหล่</span>
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
              columns={columntable}
              dataSource={data}
              onChange={handleChange}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        open={open}
        title="เบิกอะไหล่ออกจากศูนย์"
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
        <div>{value === "Barcode" ? <OrderAdd /> : <OrderAddText />}</div>
      </Modal>

      <Modal
        open={open1}
        title="แบบฟอร์มแก้ไขข้อมูล"
        onOk={handleOk1}
        onCancel={handleCancel1}
        // width={1000}
        footer={null}
      >
        <OrderEdit data={dataModal} />
      </Modal>
    </>
  );
};
export default Order;
