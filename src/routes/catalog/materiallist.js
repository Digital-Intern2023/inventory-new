import { Button, Card, Col, Collapse, Row } from "antd";
import axios from "axios";
import { Panel } from "react-instantsearch-dom";
import { API_URL ,authUser} from "../../constanst";
import { useEffect, useState } from "react";
import StockMaterial from "./stock";
import SignIn from "../../containers/SignIn";

const Materiallist = (props) => {

    const Panel = Collapse.Panel;

    const callback = (key) => {
    };
    const [material, setMaterial] = useState();

    function getDataMeterial() {
        axios.get(API_URL + "/api/Material/GetSingleMaterialbyCode/" + props.match.params.id).then((res) => {
            setMaterial(res.data.data)
        })
    }
    useEffect(async () => {
        if (!authUser) {
            return <SignIn />;
          }
        await getDataMeterial();
    }, [])
    
    return (
        <>
            <Row>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {/* `${material != null ? "รายการอะไหล่ "+ material[0].code + " " + material[0].name : "กำลังโหลด"}` */}
                    <Card
                        hoverable title={`${material != null ? "รายการอะไหล่ "+ material.code + " " + material.name : "กำลังโหลด"}`}
                    >
                        <Collapse defaultActiveKey={['0', '1', '2', '3', '4', '5']} onChange={callback}>
                            <Panel header={"CPAC Metro"} key={0}>
                                <StockMaterial slug={"90000140"} code={props.match.params.id}/>
                            </Panel>
                            <Panel header={"RMC - South Chain"} key={1}>
                                <StockMaterial slug={"90000141"} code={props.match.params.id}/>
                            </Panel>
                            <Panel header={"CPAC East"} key={2}>
                                <StockMaterial slug={"90000142"} code={props.match.params.id}/>
                            </Panel>
                            <Panel header={"CPAC West"} key={3}>
                                <StockMaterial slug={"90000143"} code={props.match.params.id}/>
                            </Panel>
                            <Panel header={"CPAC North"} key={4}>
                                <StockMaterial slug={"90000144"} code={props.match.params.id}/>
                            </Panel>
                            <Panel header={"CPAC Northeast"} key={5}>
                                <StockMaterial slug={"90000145"} code={props.match.params.id}/>
                            </Panel>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Materiallist;