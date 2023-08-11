import { Column } from "@ant-design/plots";

const OverviewBar =(bar)=>{
  const data = bar["bar"];
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
  };
return(
<>
{/* {JSON.stringify(bar)} */}
<Column {...config} />

</>
)
}
export default OverviewBar;