import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_URL, authUser } from "../../constanst";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import CategoryEdit from "./Edit";
import Highlighter from "react-highlight-words";
import SignIn from "../../containers/SignIn";

const Category = (status) => {
  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [loading, setLoading] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const tableLoading = {
    spinning: loading,
    indicator: <Spin type="loading" />,
  };
  // console.log("st", status);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "white",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ชื่อหมวดหมู่",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: 360,
      render: (text) => <span className="gx-link">{text}</span>,
    },
    {
      title: "จำนวนอะไหล่",
      dataIndex: "count",
      key: "count",
      width: 360,
    },
    {
      title: "วันที่บันทึก",
      dataIndex: "createDate",
      key: "createDate",
      ...getColumnSearchProps("createDate"),
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
              setLoading(true);
              axios
                .post(API_URL + "/api/Category/Remove/" + record.id)

                .then((res) => {
                  console.log("delete category", res);

                  message.success(`ลบหมวดหมู่ ${record.name} แล้ว`);
                  setDataTable();
                  setLoading(false);
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

  const showModal = (record) => {
    setDataModal({ id: record.id, name: record.name });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  function setDataTable() {
    setLoading(true);
    axios.get(API_URL + "/api/Category/GetCategory").then((res) => {
      console.log("outputget category", res);
      res.data.data.map((el) => {
        let date = moment(new Date(el.createDate));
        el.createDate = date.format("DD/MM/YYYY");
      });
      setData(res.data.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    setDataTable();
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    const category = {
      name: values.name,
      createBy: authUser.id,
    };
    setLoading(true);
    axios.post(API_URL + "/api/Category/Create", category).then((res) => {
      console.log(res);
      setIsModalOpen1(false);
      setDataTable();
      setLoading(false);
      message.success(`เพิ่มหมวดหมู่ ${category.name} สำเร็จ`);
    });
  };

  return (
    <>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="รายการหมวดหมู่อะไหล่"
            extra={
              <Button type="primary" onClick={() => showModal1()}>
                + เพิ่มข้อมูล
              </Button>
            }
          >
            <Table
              loading={tableLoading}
              className="gx-table-responsive"
              columns={columns}
              dataSource={data}
            />
            <Modal
              title={`แก้ไขข้อมูลหมวดหมู่อะไหล่ ${dataModal.name}`}
              open={isModalOpen}
              onCancel={handleCancel}
              onOk={handleOk}
              footer={null}
            >
              <CategoryEdit data={dataModal} />
            </Modal>
            <Modal
              title={`สร้างหมวดหมู่อะไหล่`}
              open={isModalOpen1}
              onCancel={handleCancel1}
              onOk={handleOk1}
              footer={null}
            >
              <Card>
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
                    label="ชื่อหมวดหมู่อะไหล่"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="ระบุหมวดหมู่อะไหล่" />
                  </Form.Item>
                  <Form.Item className="align-center">
                    <Row
                      type="flex"
                      justify="center"
                      align="middle"
                      className="container"
                    >
                      <Button
                        type="primary"
                        className="gx-mb-0"
                        htmlType="submit"
                      >
                        สร้าง
                      </Button>
                    </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Category;
