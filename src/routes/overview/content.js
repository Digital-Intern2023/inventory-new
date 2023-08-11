import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constanst";
import OverviewChart from "./chart";

const OverviewContent = (data) => {
    const [store, setStore] = useState([]);
    function getStore() {
        axios.get(API_URL + `/api/store/GetStorebyDivision/${data.division}`).then((res) => {
            setStore(res.data.data)
        })
    }
    useEffect(() => {
        getStore();
    }, [])
    return (
        <>
            {store != null && store[0] != null ? (
                store.map((item) => (
                    <Card title={ "Store : " + item.name} style={{padding:"10px"}}>
                        <OverviewChart storeid={item.id}/>
                    </Card>
                ))
            ) : "ไม่มีข้อมูล"}
        </>
    )
}

export default OverviewContent;