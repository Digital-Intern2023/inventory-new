import { Card, Col, Row, Tooltip } from "antd";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Widget from "../../components/Widget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Column } from "@ant-design/plots";

const Company = ({ pie, bar }) => {
  const data = bar;
  const datapie = pie;

  const COLORS = ["#5797fc", "#FA8C16", "#f5222d", "#F1C40F", "#117A65", "#707B7C"];

  const config = {
    data,
    xField: "name",
    yField: "count",
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    scrollbar: {
      type: "horizontal",
    },
    onReady: (plot) => {
      plot.on('element:click', (...args) => {
        window.location.assign(`/order/${args[0].data.data.name}`)
      });
    },
  };

  return (
    <>
      <Row>
        {/* {JSON.stringify(data)} */}
        <Col  lg={8} xl={8} md={8} sm={24} xs={24}>
          <Link to={"/order"}>
            <Widget
              title={
                <h2 className="h4 gx-text-capitalize gx-mb-0">
                  ภาพรวมการเบิกของศูนย์
                </h2>
              }
              hoverable
              styleName="gx-text-center"
            >
              <div className="gx-py-3">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Tooltip />
                    <text
                      x="50%"
                      className="h1"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    ></text>
                    <Pie
                      data={datapie}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={47}
                      outerRadius={57}
                      fill="#8884d8"
                    >
                      {pie
                        ? datapie.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))
                        : console.log("Loading")}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <h5>กิจการ / จำนวน</h5>

                <table width={"100%"}>
                  <tbody>
                  <tr>
                      <td>
                        สี
                      </td>
                      <td>กิจการ</td>
                      <td>รายการ</td>
                      <td>ชิ้น</td>
                    </tr>
                    {pie
                      ? datapie.map((item) => (
                          <tr>
                            <td>
                              <span
                                style={{
                                  border: "solid 1px item.color",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                  backgroundColor: item.color,
                                }}
                              ></span>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
                            <td>{item.unit}</td>
                          </tr>
                        ))
                      : console.log("Loading")}
                  </tbody>
                </table>
              </div>
            </Widget>
          </Link>
        </Col>
        <Col  lg={16} xl={16} md={16} sm={24} xs={24}>
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={datachart}
              margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" stackId="a" fill="#003366" />
            </BarChart>
          </ResponsiveContainer> */}
          <h5 style={{marginBottom:"30px"}}>( Store / จำนวนชิ้น) </h5>
          <Column {...config} />
        </Col>
      </Row>
    </>
  );
};
export default Company;
