import React from "react";

import Widget from "components/Widget/index";

const ChartCard = ({prize, title, children, styleName, desc, icon}) => {
  return (
    <Widget styleName="gx-card-full">

      <div className="gx-actchart gx-px-3 gx-pt-3 gx-pb-4">
        <div className="ant-row-flex">
          <h2 className="gx-mb-0 gx-fs-xxl gx-font-weight-medium">
            <span className={`gx-mb-0 gx-ml-2 gx-pt-xl-2 gx-fs-lg gx-chart-etherium`}>{title}
            </span>

          </h2>
          <b  className={`gx-fs-xl gx-ml-auto gx-text-primary gx-fs-xxxl`}>{prize}</b>
        </div>
        {/* <p className="gx-mb-0 gx-fs-sm gx-text-grey">{desc}</p> */}
      </div>
      {children}
    </Widget>
  );
};

export default ChartCard;
