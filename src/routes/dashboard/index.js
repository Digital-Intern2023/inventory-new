import { Col, DatePicker, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import SignIn from "../../containers/SignIn";
// import ChartCard from "../../../../app/components/dashboard/Crypto/ChartCard";
import ChartCard from "../../components/dashboard/Crypto/ChartCard";
import { API_URL, authUser } from "../../constanst";
import Widget from "../../components/Widget/index";
import dayjs from "dayjs";
import Company from "./company";
import axios from "axios";
import StockOverView from "./stock";
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [piestockdata, setPieStockdata] = useState("");
  const [barstockdata, setBarStockdata] = useState("");
  const [piedata, setPiedata] = useState("");
  const [bardata, setBardata] = useState("");
  const [overview, setOverview] = useState("");

  // const onChange = (date) => {
  //   if (date) {
  //     console.log("Date: ", date);
  //   } else {
  //     console.log("Clear");
  //   }
  // };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      getDataStockPieChartByDate(dateStrings[0], dateStrings[1]);
      getBarStockChartByDate(dateStrings[0], dateStrings[1]);
      getDataPieChartByDate(dateStrings[0], dateStrings[1]);
      getBarChartByDate(dateStrings[0], dateStrings[1]);
      getOverviewByDate(dateStrings[0], dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const onChangeTab = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `ข้อมูลการคลังอะไหล่`,
      children: <StockOverView pie={piestockdata} bar={barstockdata}/>,
    },
  ];
  const items1 = [
    {
      key: "1",
      label: `ข้อมูลการเบิกอะไหล่`,
      children: <Company pie={piedata} bar={bardata}/>,
    },
  ];
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  ////// Stock Overview
  const getDataStockPieChartByDate = (start, end) => {
    axios.get(API_URL + "/api/Home/GetPieStock/" + start + "/" + end).then((res) => {
      setPieStockdata([
        { color: "#5797fc", name: "CPAC Metro", value: res.data.data1 },
        { color: "#FA8C16", name: "RMC - South Chain", value: res.data.data2 },
        { color: "#f5222d", name: "CPAC East", value: res.data.data3 },
        { color: "#F1C40F ", name: "CPAC West", value: res.data.data4 },
        { color: "#117A65", name: "CPAC North", value: res.data.data5 },
        { color: "#707B7C ", name: "CPAC Northeast", value: res.data.data6 },
      ]);
      console.log(res);
    });
  };

  const getDataStockPieChart = () => {
    axios.get(API_URL + "/api/Home/GetPieStock").then((res) => {
      setPieStockdata([
        { color: "#5797fc", name: "CPAC Metro", value: res.data.data1 },
        { color: "#FA8C16", name: "RMC - South Chain", value: res.data.data2 },
        { color: "#f5222d", name: "CPAC East", value: res.data.data3 },
        { color: "#F1C40F ", name: "CPAC West", value: res.data.data4 },
        { color: "#117A65", name: "CPAC North", value: res.data.data5 },
        { color: "#707B7C ", name: "CPAC Northeast", value: res.data.data6 },
      ]);
    });
  };
  const getBarStockChartByDate = (start, end) => {
    axios
      .get(API_URL + "/api/Home/GetChartStock/"+authUser.user.id+"/" + start + "/" + end)
      .then((res) => {
        setBarStockdata(res.data.data);
      });
  };
  const getBarStockChart = () => {
    axios.get(API_URL + "/api/Home/GetChartStock/"+authUser.user.id).then((res) => {
      setBarStockdata(res.data.data);
    });
  };

  ///// end

  ////// Order Overview
  const getDataPieChartByDate = (start, end) => {
    axios.get(API_URL + "/api/Home/GetPie/" + start + "/" + end).then((res) => {
      setPiedata([
        { color: "#5797fc", name: "CPAC Metro", value: res.data.data1 },
        { color: "#FA8C16", name: "RMC - South Chain", value: res.data.data2 },
        { color: "#f5222d", name: "CPAC East", value: res.data.data3 },
        { color: "#F1C40F ", name: "CPAC West", value: res.data.data4 },
        { color: "#117A65", name: "CPAC North", value: res.data.data5 },
        { color: "#707B7C ", name: "CPAC Northeast", value: res.data.data6 },
      ]);
      console.log(res);
    });
  };

  const getDataPieChart = () => {
    axios.get(API_URL + "/api/Home/GetPie").then((res) => {
      setPiedata([
        { color: "#5797fc", name: "CPAC Metro", value: res.data.data1 },
        { color: "#FA8C16", name: "RMC - South Chain", value: res.data.data2 },
        { color: "#f5222d", name: "CPAC East", value: res.data.data3 },
        { color: "#F1C40F ", name: "CPAC West", value: res.data.data4 },
        { color: "#117A65", name: "CPAC North", value: res.data.data5 },
        { color: "#707B7C ", name: "CPAC Northeast", value: res.data.data6 },
      ]);
    });
  };
  const getBarChartByDate = (start, end) => {
    axios
      .get(API_URL + "/api/Home/GetChart/" + start + "/" + end)
      .then((res) => {
        setBardata(res.data.data);
      });
  };
  const getBarChart = () => {
    axios.get(API_URL + "/api/Home/GetChart/"+authUser.user.id).then((res) => {
      setBardata(res.data.data);
      console.log("barres", bardata);
    });
  };

  ///// end
  const getOverviewByDate = (start, end) => {
    axios
      .get(API_URL + "/api/Home/GetOverview/"+authUser.user.id +"/" + start + "/" + end)
      .then((res) => {
        setOverview(res.data);
        console.log(res);
      });
  };
  const getOverview = () => {
    axios.get(API_URL + "/api/Home/GetOverview").then((res) => {
      setOverview(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    if (!authUser) {
      return <SignIn />;
    }
    getDataStockPieChart();
    getBarStockChart();
    getDataPieChart();
    getBarChart();
    getOverview();
  }, []);
  return (
    <>
      <Widget
        extra={<RangePicker presets={rangePresets} onChange={onRangeChange} />}
        title="กรองข้อมูลตามระยะเวลา"
      ></Widget>
      <Row>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            prize={overview.data1}
            title="รายการนำเข้า"
            icon="bitcoin"
            styleName="up"
            desc="Bitcoin Price"
          />
        </Col>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            prize={overview.data2}
            title="รายการเบิกออก"
            icon="etherium"
            desc="Etherium Price"
          />
        </Col>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <ChartCard
            prize={overview.data3}
            title="รวมรายการ"
            icon="ripple"
            styleName="down"
            desc="Ripple Price"
          />
        </Col>
      </Row>

      <Widget>
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </Widget>
      <Widget>
        <Tabs defaultActiveKey="1" items={items1} onChange={onChangeTab} />
      </Widget>
    </>
  );
};

export default Dashboard;
