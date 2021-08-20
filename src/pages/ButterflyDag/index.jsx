import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { EditorGraph } from './components/EditorGraph/EditorGraph';

import Node from './components/EditorGraph/node';
import Edge from './components/EditorGraph/edge';
import BaseEndpoint from './components/EditorGraph/endpoint';
import EditorPanel from './components/EditorPanel/index';
import { Component } from 'react';

class EditorFlow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const data = {
      nodes: [{
        id: '0',
        top: 100,
        left: 100,
        height: 90,
        width: 140,
        text: 'mykafka',
        Class: Node,
        pluginType: 'source',
        Data: {
            "plugin_name": "KafkaTableStream",
            "consumer.group.id": "filling06",
            "topics": "arcana",
            "result_table_name": "KafkaTableStreamTable",
            "format.type": "json",
            "schema": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}",
            "offset.reset": "earliest",
            "consumer.bootstrap.servers": "192.168.1.70:9092",
            "parallelism": 2,
            "name": "mykafka"
        },
        pluginName: "JdbcSource",
        pluginOptions: [
            {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "KafkaTableStream",
                "must": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "readOnly": true
            },{
                "name": "consumer.group.id",
                "text": "消费组",
                "defaultValue": "filling-group01",
                "must": true,
                "paramsDesc": "kafka里的group.id参数",
                "desc": " ",
                "readOnly": false
            },{
                "name": "topics",
                "text": "订阅组",
                "defaultValue": "filling-topic",
                "must": true,
                "paramsDesc": "kakfa的topic参数, 可以数多个, 用`,`分割",
                "desc": " ",
                "readOnly": false
            },{
                "name": "schema",
                "text": "简单数据",
                "defaultValue": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}",
                "must": true,
                "paramsDesc": "数据样本, 用来解析数据格式",
                "desc": " ",
                "readOnly": false
            },{
                "name": "offset.reset",
                "text": "消费模式",
                "defaultValue": "earliest",
                "must": true,
                "paramsDesc": "earliest: 尽可能从最早消费数据,latest: 从最新处消费数据,fromTimestamp: 指定时间戳消费, fromGroupOffsets: 从当前的offset消费, 若果不存在offset, 则和latest一致",
                "desc": " ",
                "readOnly": false
            },{
                "name": "consumer.bootstrap.servers",
                "text": "kakfa地址",
                "defaultValue": "192.168.1.70:9092",
                "must": true,
                "paramsDesc": "kakfa地址, 例如: 127.0.0.1:9092",
                "desc": " ",
                "readOnly": false
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "must": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",
                "readOnly": false
            },{
                "name": "name",
                "text": "名称",
                "defaultValue": "kafka-source",
                "must": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",
                "readOnly": false
            }
        ],
        endpoints: [{
          id: 'right',
          orientation: [1, 0],
          pos: [0, 0.5],
          label: 'left_x_ax222is',
          color: 'system-green',
          Class: BaseEndpoint
        }]
      }, {
        id: 'mysql',
        top: 200,
        left: 100,
        height: 90,
        width: 140,
        text: 'mysql',
        Class: Node,
        Data: {
          "plugin_name": "JdbcSource",
          "driver": "com.mysql.jdbc.Driver",
          "result_table_name": "JdbcSourceTable",
          "url": "jdbc:mysql://10.10.14.17:3306/tmp",
          "username": "aiops",
          "password": "aiops",
          "query": "select * from t_group"
      },
      pluginType: 'source',
      pluginName: "JdbcSource",
      pluginOptions: [
          {
              "name": "plugin_name",
              "text": "插件名称",
              "defaultValue": "JdbcSource",
              "must": true,
              "paramsDesc": "插件名称, 系统自带, 无需更改",
              "desc": " ",
              "readOnly": true
          },{
              "name": "driver",
              "text": "驱动",
              "defaultValue": "com.mysql.cj.jdbc.Driver",
              "must": true,
              "paramsDesc": "jdbc驱动类",
              "desc": " ",
              "readOnly": false
          },{
              "name": "url",
              "text": "链接字符串",
              "defaultValue": "jdbc:mysql://127.0.0.1:3306/test_demo?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
              "must": true,
              "paramsDesc": "链接字符串, 例如: jdbc:mysql://127.0.0.1:3306/test_demo",
              "desc": " ",
              "readOnly": false
          },{
              "name": "username",
              "text": "用户名",
              "defaultValue": "root",
              "must": true,
              "paramsDesc": "链接数据库用户名",
              "desc": " ",
              "readOnly": false
          },{
              "name": "password",
              "text": "密码",
              "defaultValue": "root",
              "must": true,
              "paramsDesc": "链接数据库密码",
              "desc": " ",
              "readOnly": false
          },{
              "name": "query",
              "text": "查询语句",
              "defaultValue": "select * from table1",
              "must": true,
              "paramsDesc": "查询的数据库语句, 例如: select * from table1",
              "desc": " ",
              "readOnly": false
          },{
              "name": "fetch_size",
              "text": "拉取数量",
              "defaultValue": "1000",
              "must": true,
              "paramsDesc": "每次拉取的数量",
              "desc": " ",
              "readOnly": false
          },{
              "name": "parallelism",
              "text": "并行度",
              "defaultValue": "1",
              "must": true,
              "paramsDesc": "flink并行度设置, 请谨慎设置",
              "desc": " ",
              "readOnly": false
          },{
              "name": "name",
              "text": "名称",
              "defaultValue": "kafka-source",
              "must": true,
              "paramsDesc": "自定义名称, 显示用",
              "desc": " ",
              "readOnly": false
          }
      ],
        endpoints: [{
          id: 'knbo_1',
          orientation: [1, 0],
          pos: [0, 0.5],
          color: 'system-green',
          Class: BaseEndpoint
        }]
      }, {
        id: '1',
        top: 100,
        left: 250,
        height: 90,
        width: 140,
        text: 'DataJoin',
        pluginType: 'source',
        Data: {
          "source_table_name": "KafkaTableStreamTable",
          "result_table_name": "KafkaTableStreamTable_default",
          "plugin_name": "DataJoin",
          "join.source_table_name": [
            "JdbcSourceTable"
          ],
          "join.JdbcSourceTable.where": "workgroup = host",
          "join.JdbcSourceTable.type": "left"
        },
        Class: Node,
        endpoints: [{
          id: 'left_2',
          orientation: [-1, 0],
          pos: [0, 0.55],
          color: 'system-green',
          Class: BaseEndpoint
        }, {
          id: 'left_3',
          orientation: [-1, 0],
          pos: [0, 0.8],
          color: 'system-green',
          Class: BaseEndpoint
        }, {
          id: 'right_1',
          orientation: [1, 0],
          pos: [0, 0.7],
          color: 'system-green',
          Class: BaseEndpoint
        }]
      }
    ],
      edges: [{
        source: 'right',
        target: 'left_2',
        sourceNode: '0',
        targetNode: '1',
        type: 'endpoint',
        Class: Edge
      }, {
        source: 'knbo_1',
        target: 'left_3',
        sourceNode: 'mysql',
        targetNode: '1',
        type: 'endpoint',
        Class: Edge
      }
    ]
    };

    return (
      <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
        <div className={styles.editor}>
          {/* <Row className={styles.editorHd}>
              <Col span={24}>
                FlowToolbar 
              </Col>
            </Row> */}
          <Row className={styles.editorBd}>
            <Col span={20} className={styles.editorContent}>
              <EditorGraph data={data} />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
              {/* FlowItemPanel */}
              <EditorPanel />
            </Col>

          </Row>
        </div>

      </PageContainer>
    );
  }
}

export default EditorFlow;