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
        Data: {
          "plugin_name": "KafkaTableStream",
          "consumer.group.id": "filling06",
          "topics": "arcana",
          "result_table_name": "KafkaTableStreamTable",
          "format.type": "json",
          "schema": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}",
          "format.allow-comments": "true",
          "format.ignore-parse-errors": "true",
          "offset.reset": "earliest",
          "consumer.bootstrap.servers": "192.168.1.70:9092",
          "parallelism": 2,
          "name": "mykafka"
        },
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
      }, {
        id: 'gamepad',
        top: 216,
        left: 250,
        height: 100,
        width: 200,
        endPointLabel: [{
          endpoint: 'greenDom_0',
          label: 'left_x_axis',
        }, {
          endpoint: 'grayDom_1',
          label: 'left_y_axis',
        }, {
          endpoint: 'grayDom_2',
          label: 'button_pressed'
        }],
        text: 'Gamepad',
        Class: Node,
      }, {
        id: 'logEvent',
        top: 226,
        left: 608,
        height: 80,
        width: 140,
        text: 'Log Event',
        Class: Node,
      }, {
        id: 'customShapes',
        top: 111,
        left: 568,
        height: 60,
        width: 140,
        text: 'Custom Shapes',
        Class: Node,
        endpoints: [{
          id: 'custom_01',
          orientation: [-1, 0],
          pos: [0, 0.8],
          color: 'system-green',
          Class: BaseEndpoint
        }]
      }],
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
      }, {
        source: 'gamepad_1',
        target: 'log_event_01',
        sourceNode: 'gamepad',
        targetNode: 'logEvent',
        type: 'endpoint',
        Class: Edge
      }, {
        source: 'right_1',
        target: 'custom_01',
        sourceNode: '1',
        targetNode: 'customShapes',
        type: 'endpoint',
        Class: Edge
      }]
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