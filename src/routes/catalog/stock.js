import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";

const StockMaterial = (slug) => {
    const [arrt1, setArrt1] = useState("");
    const [data, setData] = useState();


    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [searchedText, setSearchedText] = useState("");
    const columns = [

        {
            title: "Store",
            dataIndex: "storeName",
            key: "storeName",
            filters: arrt1,
            filteredValue: filteredInfo.storeName || null,
            onFilter: (value, record) => record.storeName.includes(value),
            sorter: (a, b) => a.storeName.length - b.storeName.length,
            sortOrder: sortedInfo.columnKey === "storeName" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "หมายเลขอะไหล่",
            dataIndex: "code",
            key: "code",
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.code).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.detail).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.parts).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.unit).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.status).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.createBy).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.storeName).toLowerCase().includes(value.toLowerCase())
                );
            },
        },
        {
            title: "ชื่ออะไหล่",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "รายละเอียด",
            dataIndex: "detail",
            key: "detail",
        },
        {
            title: "จำนวน",
            dataIndex: "count",
            key: "count",
        },
        {
            title: "หน่วยนับ",
            dataIndex: "unit",
            key: "unit",
        }
    ];

    function getDataTable() {
        axios.get(API_URL + "/api/GroupMaterial/GetStock/" + slug.slug +"/"+ slug.code).then((res) => {
            console.log(res.data.data)
            setData(res.data.data)
        })
    }

    useEffect(() => {
        getDataTable();
    }, [])
    return (
        <>
            {data != null && data[0] != null?
                <Card style={{ paddingLeft: "10px", paddingRight: "10px" }} title={"รายการอะไหล่"} >
                    <Table columns={columns} dataSource={data} />
                </Card>

                :
                <Card style={{ paddingLeft: "10px", paddingRight: "10px" }} title={"รายการอะไหล่"} type="inner" >
                    *ไม่มีรายการอะไหล่
                </Card>
            }
        </>
    )
}

export default StockMaterial;