import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, Popconfirm, Table } from "antd";

const SearchIndex = (props) => {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: "รหัสอะไหล่",
            dataIndex: "code",
            render: (text, record) => (
                <Link to={"/GroupMeterial/MaterialList/" + record.code}>
                    {record.code}
                </Link>
            ),
        },
        {
            title: "ชื่ออะไหล่",
            dataIndex: "name",
        },
        // {
        //     title: "จำนวน",
        //     dataIndex: "count",
        // },
    ];
    function getMaterialbyName() {
        axios.get(API_URL + `/api/Material/GetMaterialbyName/${props.match.params.searchText}`).then((res) => {
            console.log(res)
            setData(res.data.data);
        })
    }


    useEffect(() => {
        getMaterialbyName();
    }, [])
    return (
        <>
        {/* //     {JSON.stringify(props.match.params.searchText)}
        //     {JSON.stringify(data)} */}
            {data != null && data[0] != null ? (
                <Card
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    title={"รายการอะไหล่"}
                >
                    <Table columns={columns} dataSource={data} />
                </Card>
            ) : (
                <Card
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    title={"รายการอะไหล่"}
                    type="inner"
                >
                    *ไม่มีรายการอะไหล่
                </Card>
            )}
        </>
    )
}

export default SearchIndex;