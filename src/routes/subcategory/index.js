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
  Table,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { API_URL, authUser } from "../../constanst";
import moment from "moment";
import SubCategoryEdit from "./Edit";
import Highlighter from "react-highlight-words";

const SubCategory = () => {
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState("");

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    console.log(values);
    const subcategory = {
      name: values.name,
      categoryId: values.category,
      createBy: authUser.id,
    };
    axios.post(API_URL + "/api/SubCategory/Create", subcategory).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

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
      title: "หมวดหมู่อะไหล่",
      dataIndex: "name",
      key: "name",
      width: 360,
      ...getColumnSearchProps("name"),
      render: (text) => <span className="gx-link">{text}</span>,
    },
    {
      title: "ประเภทอะไหล่",
      dataIndex: "categoryName",
      key: "age",
      ...getColumnSearchProps("categoryName"),
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
      render: (record) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={() => {
              showModal(record);
            }}
          ></Button>

          <Popconfirm
            title={`คุณต้องการลบประเภทวัสดุ "${record.name}" นี้ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .post(API_URL + "/api/SubCategory/Remove/" + record.id)
                .then((res) => {
                  console.log("delete category", res);
                  window.location.reload();
                  message.success(`Delete ${record.name}!`);
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
  const setDataTable = () => {
    axios.get(API_URL + "/api/SubCategory/GetSubCategory").then((res) => {
      console.log("outputget category", res);
      res.data.data.map((el) => {
        let date = moment(new Date(el.createDate));
        el.createDate = date.format("DD/MM/YYYY");
      });
      setData(res.data.data);
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
    setIsModalOpen1(false);
  };
  const showModal1 = (record) => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  useEffect(() => {
    setDataTable();
    getCategory();
  }, []);
  return (
    <>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="รายการประเภทวัสดุ"
            extra={
              <Button type="primary" onClick={() => showModal1()}>
                + เพิ่มข้อมูล
              </Button>
            }
          >
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={data}
            />
          </Card>
          <Modal
            title={`แก้ไขข้อมูลประเภทวัสดุ ${dataModal.name}`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <SubCategoryEdit data={dataModal} />
          </Modal>
          <Modal
            title={`สร้างหมวดวัสดุ`}
            open={isModalOpen1}
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={null}
          >
            <Card>
              <Form
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="category"
                  label="หมวดหมู่วัสดุ"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="โปรดเลือกหมวดหมู่วัสดุ">
                    {category.sort().map((item) => (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="ชื่อประเภทวัสดุ"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="ชื่อประเภทวัสดุ" />
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
        </Col>
      </Row>
    </>
  );
};

export default SubCategory;
