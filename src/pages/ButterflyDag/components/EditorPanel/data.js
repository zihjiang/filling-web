import kafkaIcon from './images/kafka.png';
import jdbsIcon from './images/jdbc.png';
import BaseEndpoint from '../EditorGraph/endpoint';
const data = [
    {
        id: 'kafka',
        type: 'png',
        content: kafkaIcon,
        height: 90,
        width: "100%",
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
            id: 'kafka_out',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }]
    },
    {
        id: 'jdbc',
        type: 'png',
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
        content: jdbsIcon,
        height: 90,
        width: "100%"
    }
]
export default data;