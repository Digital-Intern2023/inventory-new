import { Button, Divider, Form, Input, Radio, Row, Table, message } from "antd";
import axios from "axios";
import { set } from "lodash";
import { func } from "prop-types";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";

const ManageCatalog = (data) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [dataTable, setDataTable] = useState();
  const [rowData, setRowData] = useState();
  const [searchedText, setSearchedText] = useState("");

  const columns = [
    {
      title: "หมายเลขอะไหล่",
      dataIndex: "code",
      render: (text) => <a>{text}</a>,
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.code).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "ชื่ออะไหล่",
      dataIndex: "name",
    },
  ];
  function getDataTable() {
    axios.get(API_URL + "/api/GroupMaterial/GetMaterial").then((res) => {
      setDataTable(res.data.data);
    });
  }
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setRowData(selectedRows);
    },
  };
  const onFinishFailed = (errorInfo) => {};
  const onFinish = () => {
    axios
      .post(API_URL + "/api/GroupMaterial/Create/" + data["data"].id, rowData)
      .then((res) => {
        console.log(res);
        message.success(`เพิ่มข้อมูลสำเร็จ`);
        // window.location.reload();
      });
  };
  useEffect(() => {
    getDataTable();
  }, []);
  return (
    <>
      <div>
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
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataTable}
        />
      </div>

      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0"
      >
        <Row type="flex" justify="center" align="middle" className="container">
          <Button type="primary" className="gx-mb-0" htmlType="submit">
            บันทึก
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ManageCatalog;
