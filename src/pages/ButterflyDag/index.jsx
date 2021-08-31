import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { EditorGraph } from './components/EditorGraph/EditorGraph';

import EditorPanel from './components/EditorPanel/index';
import EditorToolbar from './components/EditorToolbar';
import { Component } from 'react';
import BaseNode from './components/EditorGraph/node';
import { fillingJob } from '../FillingJobs/service';
import { Spin } from 'antd';
class EditorFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      data: {}
    }
  }

  getJob = () => {

    return fillingJob( this.state.id );
  }

  componentDidMount() {

    this.getJob().then((d) => {
      this.setState({
        data: d
      })
    })

  }

  render() {
    if(_.isEqual(this.state.data, {})) return (<Spin />);
    const data = JSON.parse(this.state.data.jobText);
    // const data = { "nodes": [{ "id": "kafka-381e976e-9619", "data": { "plugin_name": "KafkaTableStream", "consumer.group.id": "filling-group01", "topics": "filling-topic", "schema": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}", "offset.reset": "earliest", "consumer.bootstrap.servers": "192.168.1.70:9092", "parallelism": "1", "name": "kafka-source", "target_table_name": "kafka-381e976e-9619" }, "top": 165, "width": 140, "left": 70, "height": 90, "endpoints": [{ "id": "kafka_result_table_name", "orientation": [1, 0], "pos": [0, 0.5] }], "pluginOptions": "[{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"KafkaTableStream\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"consumer.group.id\",\"text\":\"消费组\",\"defaultValue\":\"filling-group01\",\"required\":true,\"paramsDesc\":\"kafka里的group.id参数\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"topics\",\"text\":\"订阅组\",\"defaultValue\":\"filling-topic\",\"required\":true,\"paramsDesc\":\"kakfa的topic参数, 可以数多个, 用`,`分割\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"schema\",\"text\":\"简单数据\",\"defaultValue\":\"{\\\"host\\\":\\\"f0e31d4cd63b\\\",\\\"@timestamp\\\":\\\"2021-08-12T03:27:57.316Z\\\",\\\"path\\\":\\\"/sample_data/apache_access_logs_1000w_02\\\",\\\"message\\\":\\\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\\\\\"GET /images/logo_cfo.gif HTTP/1.0\\\\\\\" 304 0\\\",\\\"@version\\\":\\\"1\\\"}\",\"required\":true,\"paramsDesc\":\"数据样本, 用来解析数据格式\",\"desc\":\" \",\"readOnly\":false,\"type\":\"textArea\"},{\"name\":\"offset.reset\",\"text\":\"消费模式\",\"defaultValue\":\"earliest\",\"required\":true,\"paramsDesc\":\"earliest: 尽可能从最早消费数据,latest: 从最新处消费数据,fromTimestamp: 指定时间戳消费, fromGroupOffsets: 从当前的offset消费, 若果不存在offset, 则和latest一致\",\"desc\":\" \",\"readOnly\":false,\"type\":\"select\",\"selectOptions\":[{\"value\":\"earliest\",\"label\":\"最早处消费数据\"},{\"value\":\"latest\",\"label\":\"最新处消费数据\"},{\"value\":\"fromGroupOffsets\",\"label\":\"当前消费位置消费数据\"}]},{\"name\":\"consumer.bootstrap.servers\",\"text\":\"kakfa地址\",\"defaultValue\":\"192.168.1.70:9092\",\"required\":true,\"paramsDesc\":\"kakfa地址, 例如: 127.0.0.1:9092\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\",\"digitMin\":1,\"digitMax\":20},{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"kafka-source\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"}]", "PluginType": "source", "pluginName": "KafkaTableStream", "text": "KafkaTableStream" }, { "id": "DataAggregates-a9d56f60-3f01", "data": { "name": "kafka-source", "plugin_name": "DataAggregates", "rowtime.watermark.field": "_time", "rowtime.watermark.tumble.ms": "60000", "rowtime.watermark.tumble.delay.ms": "60000", "group.fields": ["fileds"], "custom.fields": ["t1", "t2"], "custom.field.{field}.script": "", "parallelism": "1", "source_table_name": "kafka-381e976e-9619", "target_table_name": "DataAggregates-a9d56f60-3f01", "custom.field.t1.script": "t1=t1", "custom.field.t2.script": "t2=t2" }, "top": 165, "width": 140, "left": 260, "height": 90, "endpoints": [{ "id": "DataAggregates_result_table_name", "orientation": [1, 0], "pos": [0, 0.5] }, { "id": "DataAggregates_source_table_name", "orientation": [-1, 0], "pos": [0, 0.5] }], "pluginOptions": "[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"kafka-source\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"DataAggregates\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"rowtime.watermark.field\",\"text\":\"时间字段\",\"defaultValue\":\"_time\",\"required\":true,\"paramsDesc\":\"时间字段, 必须是13位时间戳类型\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"rowtime.watermark.tumble.ms\",\"text\":\"翻滚窗口的大小(毫秒)\",\"defaultValue\":\"60000\",\"required\":true,\"paramsDesc\":\"翻滚窗口的大小, 单位是毫秒\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\",\"digitMin\":\"10\",\"digitMax\":\"9999999999\"},{\"name\":\"rowtime.watermark.tumble.delay.ms\",\"text\":\"允许数据迟到时间\",\"defaultValue\":\"60000\",\"required\":true,\"paramsDesc\":\"允许数据迟到时间, 单位是毫秒\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"group.fields\",\"text\":\"分组的字段, 回车选择\",\"defaultValue\":[],\"required\":true,\"paramsDesc\":\"分组的字段, 回车选择\",\"desc\":\" \",\"readOnly\":false,\"type\":\"array\"},{\"name\":\"custom.fields\",\"text\":\"自定义聚合字段\",\"defaultValue\":[],\"required\":true,\"paramsDesc\":\"除了对group.fields字段聚合, 还可以自定义聚合字段, 这里设置的是字段名称\",\"desc\":\" \",\"readOnly\":false,\"type\":\"array\"},{\"name\":\"custom.field.{field}.script\",\"text\":\"{field}字段表达式\",\"defaultValue\":\"\",\"required\":true,\"paramsDesc\":\"{field}字段表达式\",\"desc\":\" \",\"readOnly\":false,\"type\":\"child\",\"father\":\"custom.fields\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]", "PluginType": "transfrom", "pluginName": "DataAggregates", "text": "DataAggregates" }, { "id": "dataSelecter-7d12e512-402e", "data": { "name": "DataSelecter-transfrom", "plugin_name": "DataSelecter", "select.result_table_name": ["dataSelecter-7d12e512-402e_t1", "dataSelecter-7d12e512-402e_t2"], "select.{id}_t1.where": "", "select.{id}_t2.where": "", "parallelism": "1", "source_table_name": "DataAggregates-a9d56f60-3f01", "target_table_name": "dataSelecter-7d12e512-402e", "select.dataSelecter-7d12e512-402e_t1.where": "table=1", "select.dataSelecter-7d12e512-402e_t2.where": "table=2" }, "top": 165, "width": 140, "left": 450, "height": 90, "endpoints": [{ "id": "DataSelecter_result_table_name", "orientation": [-1, 0], "pos": [0, 0.5] }, { "id": "DataSelecter_t1_result_table_name", "orientation": [1, 0], "pos": [0, 0.5] }, { "id": "DataSelecter_t2_result_table_name", "orientation": [1, 0], "pos": [0, 0.8] }], "pluginOptions": "[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"DataSelecter-transfrom\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"DataSelecter\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"select.result_table_name\",\"text\":\"生成的流\",\"defaultValue\":[],\"required\":true,\"paramsDesc\":\"生成的流\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"array\"},{\"name\":\"select.{id}_t1.where\",\"text\":\"数据{id}_t1, 的条件\",\"defaultValue\":\"\",\"required\":true,\"paramsDesc\":\"数据{id}_t1, 的条件\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":false,\"type\":\"text_rex_id\"},{\"name\":\"select.{id}_t2.where\",\"text\":\"数据{id}_t2, 的条件\",\"defaultValue\":\"\",\"required\":true,\"paramsDesc\":\"数据{id}_t2, 的条件\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":false,\"type\":\"text_rex_id\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]", "PluginType": "transfrom", "pluginName": "DataSelecter", "text": "DataSelecter" }, { "id": "ConsoleSink-58299d77-79eb", "data": { "name": "Console-sink", "plugin_name": "ConsoleSink", "parallelism": "1", "source_table_name": "dataSelecter-7d12e512-402et1" }, "top": 70, "width": 140, "left": 640, "height": 90, "endpoints": [{ "id": "Console_source_table_name", "orientation": [-1, 0], "pos": [0, 0.5] }], "pluginOptions": "[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"Console-sink\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"ConsoleSink\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]", "PluginType": "sink", "pluginName": "ConsoleSink", "text": "ConsoleSink" }, { "id": "ConsoleSink-5ea5d8bd-3cf4", "data": { "name": "Console-sink", "plugin_name": "ConsoleSink", "parallelism": "1", "source_table_name": "dataSelecter-7d12e512-402et2" }, "top": 260, "width": 140, "left": 640, "height": 90, "endpoints": [{ "id": "Console_source_table_name", "orientation": [-1, 0], "pos": [0, 0.5] }], "pluginOptions": "[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"Console-sink\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"ConsoleSink\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]", "PluginType": "sink", "pluginName": "ConsoleSink", "text": "ConsoleSink" }], "edges": [{ "id": "kafka_result_table_name-DataAggregates_source_table_name", "source": "kafka_result_table_name", "target": "DataAggregates_source_table_name", "type": "endpoint", "sourceNode": "kafka-381e976e-9619", "targetNode": "DataAggregates-a9d56f60-3f01" }, { "id": "DataAggregates_result_table_name-DataSelecter_result_table_name", "source": "DataAggregates_result_table_name", "target": "DataSelecter_result_table_name", "type": "endpoint", "sourceNode": "DataAggregates-a9d56f60-3f01", "targetNode": "dataSelecter-7d12e512-402e" }, { "id": "DataSelecter_t1_result_table_name-Console_source_table_name", "source": "DataSelecter_t1_result_table_name", "target": "Console_source_table_name", "type": "endpoint", "sourceNode": "dataSelecter-7d12e512-402e", "targetNode": "ConsoleSink-58299d77-79eb" }, { "id": "DataSelecter_t2_result_table_name-Console_source_table_name", "source": "DataSelecter_t2_result_table_name", "target": "Console_source_table_name", "type": "endpoint", "sourceNode": "dataSelecter-7d12e512-402e", "targetNode": "ConsoleSink-5ea5d8bd-3cf4" }] };

    if (data.nodes) {
      data.nodes.map(d => {
        if (!d.Class) {
          console.log('no class');
          d.Class = BaseNode;
        }
      })
    }

    return (
      <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
        <div className={styles.editor}>
          <Row className={styles.editorHd}>
            <Col span={20}>
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