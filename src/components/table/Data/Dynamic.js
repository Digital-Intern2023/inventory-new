import React from "react";
import {Card, Divider, Form, Radio, Switch, Table} from "antd";
import Icon from '@ant-design/icons';

const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <span className="gx-link">Action 一 {record.name}</span>
      <Divider type="vertical"/>
      <span className="gx-link">Delete</span>
      <Divider type="vertical"/>
      <span className="gx-link ant-dropdown-link">
        More actions <Icon type="down"/>
      </span>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const pagination = {position: 'bottom'};

class Dynamic extends React.Component {
  state = {
    pagination,
    size: 'default',
  };

  render() {
    return (
      <Card title="Dynamic">
        <Table className="gx-table-responsive" {...this.state} columns={columns} dataSource={data}/>
      </Card>
    );
  }
}

export default Dynamic;
