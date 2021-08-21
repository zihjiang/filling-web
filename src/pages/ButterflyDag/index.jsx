import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { EditorGraph } from './components/EditorGraph/EditorGraph';

import Node from './components/EditorGraph/node';
import Edge from './components/EditorGraph/edge';
import BaseEndpoint from './components/EditorGraph/endpoint';
import EditorPanel from './components/EditorPanel/index';
import EditorToolbar from './components/EditorToolbar';
import { Component } from 'react';

class EditorFlow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const data = {
      nodes: [
        
    ]
    };

    return (
      <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
        <div className={styles.editor}>
          <Row className={styles.editorHd}>
              <Col span={24}>
                {/* FlowToolbar  */}
                <EditorToolbar />
              </Col>
            </Row>
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