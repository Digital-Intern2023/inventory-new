import { Card, Col, Row, Timeline } from "antd";

import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL ,authUser} from "../../constanst";

import moment from "moment";
import SignIn from "../../containers/SignIn";

const StockDetail = (props) => {
  const [stock, setStock] = useState([]);
  const [log, setLog] = useState([]);
  function getStock() {
    axios
      .get(API_URL + "/api/stock/GetSingle/" + props.match.params.id)
      .then((res) => {
        setStock(res.data.data);
      });
  }
  function getLog() {
    axios
      .get(API_URL + "/api/stock/GetLog/" + props.match.params.id)
      .then((res) => {
        res.data.data.map((el) => {
          let date = moment(new Date(el.createDate));
          el.createDate = date.format("DD/MM/YYYY hh:mm");
        });
        setLog(res.data.data);
      });
  }
  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    getStock();
    getLog();
  }, []);
  return (
    <>
      {/* {JSON.stringify(log)} */}
      <div
        className="gx-profile-banner"
        style={{ zIndex: 1, marginTop: "10px" }}
      >
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top">
            <div className="gx-profile-banner-top-left">
              <div className="gx-profile-banner-avatar-info">
                <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                  {stock != null && stock[0] != null
                    ? stock[0].code + " " + stock[0].name
                    : "กำลังโหลด"}
                </h2>
                <p className="gx-mb-0 gx-fs-lg">
                  {stock != null && stock[0] != null
                    ? stock[0].detail
                    : "กำลังโหลด"}
                </p>
              </div>
            </div>
            <div className="gx-profile-banner-top-right">
              <ul className="gx-follower-list">
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                    จำนวนในคลัง{" "}
                    {stock != null && stock[0] != null
                      ? stock[0].count + " " + stock[0].unit
                      : "กำลังโหลด"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="gx-profile-content"></div>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ zIndex: 2 }}>
          <Card title="ประวัติการใช้งาน" className="gx-card">
            {log != null ? (
              <Timeline>
                {log.map((item) => (
                  <Timeline.Item>
                    {" "}
                    {item.detail}
                    <br />
                    เลขที่ใบเบิก หรือ แหล่งที่มา {item.refcode}
                    <br />{" "}
                    {"วันที่/เวลา " +
                      item.createDate +
                      ", ผู้อัปเดต " +
                      item.createBy}
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              console.log("Noo")
            )}
            {/* <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StockDetail;
