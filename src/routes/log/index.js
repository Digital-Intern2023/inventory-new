import { SmileOutlined } from "@ant-design/icons";
import { Card, Timeline } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";
import moment from "moment";

const Index = () => {
    const [data, setData] = useState([]);
    function getData() {
        axios.get(API_URL + `/api/Log/Get`).then((res) => {
            console.log(res);
            res.data.log.map((el) => {
                let createDate = moment(new Date(el.createDate));
                el.createDate = createDate.format("DD/MM/YYYY");
            });
            setData(res.data.log);
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {/* {JSON.stringify(data)} */}
            <Card title={`ประวัติการทำรายการ`}>
                <Timeline>
                    {data.map((i) => (
                        i.status == `Add` ? (
                            <Timeline.Item color="green">
                                <h4>วันที่/เวลา {i.createDate} ,ผู้ทำรายการ {i.createBy}</h4>
                                <h5>รายการอะไหล่หมายเลข {i.code + " " + i.name}</h5>
                                <h5>เลขที่ใบเบิก หรือ แหล่งที่มา : {i.refcode}</h5>
                                <h5>รายละเอียด</h5>
                                <p>{i.detail}</p>
                            </Timeline.Item>
                        )
                            : (
                                <Timeline.Item color="red">
                                    {"วันที่/เวลา , ผู้อัปเดต "}
                                </Timeline.Item>
                            )
                    ))}
                </Timeline>
            </Card>
        </>
    )
}
export default Index;