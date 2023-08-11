import { Button, Card, Col, Collapse, Row } from "antd";
import { useEffect, useState } from "react";
import OverviewContent from "./content";
import SignIn from "../../containers/SignIn";
import { authUser } from "../../constanst";

const Overview = () => {

    const Panel = Collapse.Panel;

    const callback = (key) => {
    };
    const [material, setMaterial] = useState();

    // function getDataMeterial() {
    //     axios.get(API_URL + "/api/Material/GetSingleMaterialbyCode/" + props.match.params.id).then((res) => {
    //         setMaterial(res.data.data)
    //     })
    // }
    useEffect(async () => {
        if (!authUser) {
            return <SignIn />;
          }
        // await getDataMeterial();
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
                                <OverviewContent division="90000141"/>
                            </Panel>
                            <Panel header={"RMC - South Chain"} key={1}>
                                <OverviewContent division="90000142"/>
                            </Panel>
                            <Panel header={"CPAC East"} key={2}>
                                <OverviewContent division="90000143"/>
                            </Panel>
                            <Panel header={"CPAC West"} key={3}>
                                <OverviewContent division="90000144"/>
                            </Panel>
                            <Panel header={"CPAC North"} key={4}>
                                <OverviewContent division="90000145"/>
                            </Panel>
                            <Panel header={"CPAC Northeast"} key={5}>
                                <OverviewContent division="90000146"/>
                            </Panel>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Overview;