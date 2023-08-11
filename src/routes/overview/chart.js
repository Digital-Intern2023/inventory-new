import { Column } from "@ant-design/plots";
import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";
import OverviewBar from "./bar";

const OverviewChart = (data) => {
    const [bar,setBar] = useState([])
    var dataChart = [{"name":"เชียงราย","count":160},{"name":"เชียงใหม่","count":111087},{"name":"นครสวรรค์","count":144}]
    const config = {
        dataChart,
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
    };
    function getBarChart(){
        axios.get(API_URL +`/api/Overview/GetOverView/${data.storeid}`).then((res)=>{
            console.log(res)
            setBar(res.data.data);
        })
    }
    useEffect(()=>{
        getBarChart();
    },[])
    return (
        <Row>
            <Col lg={24} md={24}>
                { bar.length > 0 ? (
                    <OverviewBar bar={bar}/>
                ) : "ไม่มีข้อมูล"}
                
            </Col>
        </Row>
    )
}

export default OverviewChart;