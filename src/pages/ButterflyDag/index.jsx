import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { EditorGraph } from './components/EditorGraph/EditorGraph';

import EditorPanel from './components/EditorPanel/index';
import EditorToolbar from './components/EditorToolbar';
import { Component } from 'react';
import BaseNode from './components/EditorGraph/node';

class EditorFlow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const data = {"nodes":[{"id":"kafka-54df1f69-ef13","data":{"plugin_name":"KafkaTableStream","consumer.group.id":"filling-group01","topics":"filling-topic","schema":"{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}","offset.reset":"earliest","consumer.bootstrap.servers":"192.168.1.70:9092","parallelism":"1","name":"kafka-source","target_table_name":"kafka-54df1f69-ef13"},"top":70,"width":140,"left":70,"height":90,"endpoints":[{"id":"kafka_result_table_name","orientation":[1,0],"pos":[0,0.5]}],"pluginOptions":"[{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"KafkaTableStream\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"consumer.group.id\",\"text\":\"消费组\",\"defaultValue\":\"filling-group01\",\"required\":true,\"paramsDesc\":\"kafka里的group.id参数\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"topics\",\"text\":\"订阅组\",\"defaultValue\":\"filling-topic\",\"required\":true,\"paramsDesc\":\"kakfa的topic参数, 可以数多个, 用`,`分割\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"schema\",\"text\":\"简单数据\",\"defaultValue\":\"{\\\"host\\\":\\\"f0e31d4cd63b\\\",\\\"@timestamp\\\":\\\"2021-08-12T03:27:57.316Z\\\",\\\"path\\\":\\\"/sample_data/apache_access_logs_1000w_02\\\",\\\"message\\\":\\\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\\\\\"GET /images/logo_cfo.gif HTTP/1.0\\\\\\\" 304 0\\\",\\\"@version\\\":\\\"1\\\"}\",\"required\":true,\"paramsDesc\":\"数据样本, 用来解析数据格式\",\"desc\":\" \",\"readOnly\":false,\"type\":\"textArea\"},{\"name\":\"offset.reset\",\"text\":\"消费模式\",\"defaultValue\":\"earliest\",\"required\":true,\"paramsDesc\":\"earliest: 尽可能从最早消费数据,latest: 从最新处消费数据,fromTimestamp: 指定时间戳消费, fromGroupOffsets: 从当前的offset消费, 若果不存在offset, 则和latest一致\",\"desc\":\" \",\"readOnly\":false,\"type\":\"select\",\"selectOptions\":[{\"value\":\"earliest\",\"label\":\"最早处消费数据\"},{\"value\":\"latest\",\"label\":\"最新处消费数据\"},{\"value\":\"fromGroupOffsets\",\"label\":\"当前消费位置消费数据\"}]},{\"name\":\"consumer.bootstrap.servers\",\"text\":\"kakfa地址\",\"defaultValue\":\"192.168.1.70:9092\",\"required\":true,\"paramsDesc\":\"kakfa地址, 例如: 127.0.0.1:9092\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\",\"digitMin\":1,\"digitMax\":20},{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"kafka-source\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"}]","PluginType":"source","pluginName":"KafkaTableStream","text":"KafkaTableStream"},{"id":"DataAggregates-d6526eea-432d","data":{"name":"kafka-source","plugin_name":"DataAggregates","rowtime.watermark.field":"_time","rowtime.watermark.tumble.ms":"60000","rowtime.watermark.tumble.delay.ms":"60000","group.fields":"","custom.fields":"","parallelism":"1","target_table_name":"DataAggregates-d6526eea-432d","source_table_name":"kafka-54df1f69-ef13"},"top":70,"width":140,"left":260,"height":90,"endpoints":[{"id":"DataAggregates_result_table_name","orientation":[1,0],"pos":[0,0.5]},{"id":"DataAggregates_source_table_name","orientation":[-1,0],"pos":[0,0.5]}],"pluginOptions":"[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"kafka-source\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"DataAggregates\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"rowtime.watermark.field\",\"text\":\"时间字段\",\"defaultValue\":\"_time\",\"required\":true,\"paramsDesc\":\"时间字段, 必须是13位时间戳类型\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"rowtime.watermark.tumble.ms\",\"text\":\"翻滚窗口的大小(毫秒)\",\"defaultValue\":\"60000\",\"required\":true,\"paramsDesc\":\"翻滚窗口的大小, 单位是毫秒\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\",\"digitMin\":\"10\",\"digitMax\":\"9999999999\"},{\"name\":\"rowtime.watermark.tumble.delay.ms\",\"text\":\"允许数据迟到时间\",\"defaultValue\":\"60000\",\"required\":true,\"paramsDesc\":\"允许数据迟到时间, 单位是毫秒\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"group.fields\",\"text\":\"聚合字段\",\"defaultValue\":\"\",\"required\":true,\"paramsDesc\":\"聚合的字段, 多个字段逗号分割\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"custom.fields\",\"text\":\"自定义聚合字段\",\"defaultValue\":\"\",\"required\":true,\"paramsDesc\":\"除了对group.fields字段聚合, 还可以自定义聚合字段, 这里设置的是字段名称\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]","PluginType":"transfrom","pluginName":"DataAggregates","text":"DataAggregates"},{"id":"ConsoleSink-739ff904-f8ba","data":{"name":"Console-sink","plugin_name":"ConsoleSink","parallelism":"1","source_table_name":"DataAggregates-d6526eea-432d"},"top":70,"width":140,"left":450,"height":90,"endpoints":[{"id":"Console_source_table_name","orientation":[-1,0],"pos":[0,0.5]}],"pluginOptions":"[{\"name\":\"name\",\"text\":\"名称\",\"defaultValue\":\"Console-sink\",\"required\":true,\"paramsDesc\":\"自定义名称, 显示用\",\"desc\":\" \",\"readOnly\":false,\"type\":\"text\"},{\"name\":\"plugin_name\",\"text\":\"插件名称\",\"defaultValue\":\"ConsoleSink\",\"required\":true,\"paramsDesc\":\"插件名称, 系统自带, 无需更改\",\"desc\":\" \",\"display\":\"none\",\"readOnly\":true,\"type\":\"text\"},{\"name\":\"parallelism\",\"text\":\"并行度\",\"defaultValue\":\"1\",\"required\":true,\"paramsDesc\":\"flink并行度设置, 请谨慎设置\",\"desc\":\" \",\"readOnly\":false,\"type\":\"digit\"}]","PluginType":"sink","pluginName":"ConsoleSink","text":"ConsoleSink"}],"edges":[{"id":"kafka_result_table_name-DataAggregates_source_table_name","source":"kafka_result_table_name","target":"DataAggregates_source_table_name","type":"endpoint","sourceNode":"kafka-54df1f69-ef13","targetNode":"DataAggregates-d6526eea-432d"},{"id":"DataAggregates_result_table_name-Console_source_table_name","source":"DataAggregates_result_table_name","target":"Console_source_table_name","type":"endpoint","sourceNode":"DataAggregates-d6526eea-432d","targetNode":"ConsoleSink-739ff904-f8ba"}]};

    if(data.nodes) {
      data.nodes.map(d => {
        if(!d.Class) {
          console.log('no class');
          d.Class = BaseNode;
        }
      })
    }

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