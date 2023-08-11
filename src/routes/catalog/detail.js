import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Table,
  message,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { API_URL, authUser } from "../../constanst";
import axios from "axios";
import { Panel } from "react-instantsearch-dom";
import { string } from "prop-types";
import TableCatalog from "./table";
import { DeleteOutlined } from "@ant-design/icons";
import SignIn from "../../containers/SignIn";

const MachineDetail = (props) => {
  const [machine, setMachine] = useState();
  const [group, setGroup] = useState();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const Panel = Collapse.Panel;
  var lgroup = [];

  const callback = (key) => {};

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const onFinishFailed = (errorInfo) => {};

  const onFinish = async (values) => {
    console.log(values);
    const context = {
      name: values.name,
      createBy: authUser.id,
      machineId: props.match.params.id,
    };
    await axios.post(API_URL + "/api/Group/Create", context).then((res) => {
      setIsModalOpen1(false);
      getDataGroup();
      message.success(`สร้างกลุ่มเครื่องจักร ${values.name} สำเร็จ`);
    });
  };
  function getDataMachine() {
    axios
      .get(API_URL + "/api/Machine/GetSingleMachine/" + props.match.params.id)
      .then((res) => {
        setMachine(res.data.machine);
      });
  }
  function getDataGroup() {
    axios
      .get(API_URL + "/api/Group/GetGroup/" + props.match.params.id)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.groups.length; i++) {
          console.log(res.data.groups[i].id);
          lgroup.push(res.data.groups[i].id.toString());
        }
        console.log(lgroup);
        setGroup(res.data.groups);
      });
  }
  useEffect(async () => {
    if (!authUser) {
      return <SignIn />;
    }
    await getDataMachine();
    await getDataGroup();
  }, []);
  return (
    <>
      {/* {JSON.stringify(props.match.params.id)}
            <br />
            {JSON.stringify(machine)}
            <br />
            {JSON.stringify(group)} */}
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card
            hoverable
            title={`เครื่องจักร : ${
              machine != null ? machine.name : "กำลังโหลด"
            }`}
            extra={
              <Button type="primary" onClick={() => showModal1()}>
                + เพิ่มข้อมูลกลุ่มเครื่องจักร
              </Button>
            }
          >
            {group != null && group[0] != null ? (
              <Collapse
                defaultActiveKey={[
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                  "31",
                  "32",
                  "33",
                  "34",
                  "35",
                  "36",
                  "37",
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                  "46",
                  "47",
                  "48",
                  "49",
                  "50",
                  "51",
                  "52",
                  "53",
                  "54",
                  "55",
                  "56",
                  "57",
                  "58",
                  "59",
                  "60",
                  "61",
                  "62",
                  "63",
                  "64",
                  "65",
                  "66",
                  "67",
                  "68",
                  "69",
                  "70",
                  "71",
                  "72",
                  "73",
                  "74",
                  "75",
                  "76",
                  "77",
                  "78",
                  "79",
                  "80",
                  "81",
                  "82",
                  "83",
                  "84",
                  "85",
                  "86",
                  "87",
                  "88",
                  "89",
                  "90",
                  "91",
                  "92",
                  "93",
                  "94",
                  "95",
                  "96",
                  "97",
                  "98",
                  "99",
                ]}
                onChange={callback}
              >
                {group.map((item, index) => (
                  <Panel header={item.name} key={index}>
                    <TableCatalog id={item.id} />
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <div style={{ textAlign: "center" }}>
                {" "}
                ไม่มีข้อมูลกลุ่มเครื่องจักร
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title={`สร้างกลุ่มเครื่องจักร`}
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
            label="ชื่อกลุ่มเครื่องจักร"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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

export default MachineDetail;
