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
import StoreEdit from "./Edit";
import SignIn from "../../containers/SignIn";

const Store = (status) => {
  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [loading, setLoading] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [division,setDivision] = useState([]);
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
      title: "ชื่อ Store",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: 360,
      render: (text) => <span className="gx-link">{text}</span>,
    },
    {
      title: "ภาค",
      dataIndex: "divisionName",
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
            title={`คุณต้องการลบ Store "${record.name}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              setLoading(true);
              axios
                .post(API_URL + "/api/Store/Remove/" + record.id)

                .then((res) => {

                  message.success(`ลบ Store ${record.name} แล้ว`);
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
    setDataModal({ id: record.id, name: record.name ,divisionCode: record.divisionCode});
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    getDivision();
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
    axios.get(API_URL + "/api/Store/GetStore").then((res) => {
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

  const onFinishFailed = (errorInfo) => { };

  const onFinish = (values) => {
    const context = {
      name: values.name,
      divisionCode: values.divisionCode
    };
    setLoading(true);
    axios.post(API_URL + "/api/Store/Create", context).then((res) => {
      console.log(res);
      setIsModalOpen1(false);
      setDataTable();
      setLoading(false);
      message.success(`เพิ่ม Store ${values.name} สำเร็จ`);
    });
  };

  function getDivision(){
    axios.get(API_URL+`/api/store/GetDivision`).then((res)=>{
      setDivision(res.data.data);
    })
  }
  
  useEffect(()=>{
    getDivision();
  },[])


  return (
    <>
    {/* {JSON.stringify(division)} */}
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="Store"
            extra={
              <Button type="primary" onClick={() => showModal1()}>
                + สร้าง Store
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
              title={`แก้ไขข้อมูล Storeอะไหล่ ${dataModal.name}`}
              open={isModalOpen}
              onCancel={handleCancel}
              onOk={handleOk}
              footer={null}
            >
              <StoreEdit data={dataModal} />
            </Modal>
            <Modal
              title={`สร้าง Store ใหม่`}
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
                  label="ชื่อ Store"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="ระบุชื่อ Store" />
                </Form.Item>
                <Form.Item
                  name="divisionCode"
                  label="ภาค"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="กรุณาเลือกภาค">
                    {division.map((item)=>(
                    <Select.Option value={item.code}>
                      {item.name}
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
                      type="primary"
                      className="gx-mb-0"
                      htmlType="submit"
                    >
                      สร้าง
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Store;
