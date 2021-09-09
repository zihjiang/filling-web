import kafkaIcon from './images/kafka.png';
import jdbsIcon from './images/jdbc.png';
import dataGenIcon from './images/dataGen.png';
import DataAggregatesIcon from './images/DataAggregates.png';
import enbase64Icon from './images/enbase64.png';
import debase64Icon from './images/debase64.png';
import dataJoinIcon from './images/dataJoin.png';
import dataSelectorIcon from './images/dataSelector.png';
import devIcon from './images/dev.png';

import BaseEndpoint from '../EditorGraph/endpoint';

import _ from 'lodash';
const source = [
    {
        id: 'kafka',
        text: 'kafka consumer',
        type: 'png',
        content: kafkaIcon,
        height: 90,
        width: "100%",
        pluginType: 'source',

        pluginName: "KafkaTableStream",
        pluginOptions: [
            {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "KafkaTableStream",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "consumer.group.id",
                "text": "消费组",
                "defaultValue": "filling-group01",
                "required": true,
                "paramsDesc": "kafka里的group.id参数",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "topics",
                "text": "订阅组",
                "defaultValue": "filling-topic",
                "required": true,
                "paramsDesc": "kakfa的topic参数, 可以数多个, 用`,`分割",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "schema",
                "text": "简单数据",
                "defaultValue": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}",
                "required": true,
                "paramsDesc": "数据样本, 用来解析数据格式",
                "desc": " ",

                "readOnly": false,
                "type": "textArea"
            }, {
                "name": "format.type",
                "text": "数据类型",
                "defaultValue": "json",
                "required": true,
                "paramsDesc": "kafka消息的数据格式",
                "desc": " ",

                "readOnly": false,
                "type": "select",
                "selectOptions": [
                    {
                        "value": "json",
                        "label": "json"
                    }, {
                        "value": "csv",
                        "label": "csv"
                    }, {
                        "value": "text",
                        "label": "text"
                    }
                ]
            }, {
                "name": "offset.reset",
                "text": "消费模式",
                "defaultValue": "earliest",
                "required": true,
                "paramsDesc": "earliest: 尽可能从最早消费数据,latest: 从最新处消费数据,fromTimestamp: 指定时间戳消费, fromGroupOffsets: 从当前的offset消费, 若果不存在offset, 则和latest一致",
                "desc": " ",

                "readOnly": false,
                "type": "select",
                "selectOptions": [
                    {
                        "value": "earliest",
                        "label": "最早处消费数据"
                    }, {
                        "value": "latest",
                        "label": "最新处消费数据"
                    }, {
                        "value": "fromGroupOffsets",
                        "label": "当前消费位置消费数据"
                    }
                ]
            }, {
                "name": "consumer.bootstrap.servers",
                "text": "kakfa地址",
                "defaultValue": "192.168.1.70:9092",
                "required": true,
                "paramsDesc": "kakfa地址, 例如: 127.0.0.1:9092",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit",
                "digitMin": 1,
                "digitMax": 20,
            }, {
                "name": "name",
                "text": "名称",
                "defaultValue": "kafka-source",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }
        ],
        endpoints: [{
            id: 'kafka_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }]
    },
    {
        id: 'jdbc',
        text: 'jdbc源',
        type: 'png',
        Data: {},
        pluginType: 'source',
        pluginName: "JdbcSource",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "kafka-source",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "JdbcSource",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "driver",
                "text": "驱动",
                "defaultValue": "com.mysql.cj.jdbc.Driver",
                "required": true,
                "paramsDesc": "jdbc驱动类",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "url",
                "text": "链接字符串",
                "defaultValue": "jdbc:mysql://127.0.0.1:3306/test_demo?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
                "required": true,
                "paramsDesc": "链接字符串, 例如: jdbc:mysql://127.0.0.1:3306/test_demo",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "username",
                "text": "用户名",
                "defaultValue": "root",
                "required": true,
                "paramsDesc": "链接数据库用户名",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "password",
                "text": "密码",
                "defaultValue": "root",
                "required": true,
                "paramsDesc": "链接数据库密码",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "query",
                "text": "查询语句",
                "defaultValue": "select * from table1",
                "required": true,
                "paramsDesc": "查询的数据库语句, 例如: select * from table1",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "fetch_size",
                "text": "拉取数量",
                "defaultValue": "1000",
                "required": true,
                "paramsDesc": "每次拉取的数量",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'jdbc_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: jdbsIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'dataGen',
        text: 'dataGen源',
        type: 'png',
        Data: {
            "plugin_name": "DataGenTableStream",
            "result_table_name": "dataGenTableStreamTable",
            "schema": "{\"id\":1, \"host\":\"192.168.1.103\",\"source\":\"datasource\",\"MetricsName\":\"cpu\",\"value\":49}",
            "rows-per-second": 1000000,
            "number-of-rows": 100000000,
            "fields": [
                {
                    "id": {
                        "kind": "SEQUENCE",
                        "type": "Int",
                        "start": 0,
                        "end": 10000000
                    }
                },
                {
                    "host": {
                        "type": "String",
                        "length": 1
                    }
                },
                {
                    "source": {
                        "type": "String",
                        "length": 10
                    }
                },
                {
                    "MetricsName": {
                        "type": "String",
                        "length": 10
                    }
                },
                {
                    "value": {
                        "type": "Int",
                        "min": 1,
                        "max": 2
                    }
                }
            ],
            "parallelism": 5,
            "name": "my-datagen-source"
        },
        pluginType: 'source',
        pluginName: "dataGenSource",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "kafka-source",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "dataGenSource",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "schema",
                "text": "简单数据",
                "defaultValue": "{\"host\":\"f0e31d4cd63b\",\"@timestamp\":\"2021-08-12T03:27:57.316Z\",\"path\":\"/sample_data/apache_access_logs_1000w_02\",\"message\":\"127.0.0.1 - - [19/Jun/1998:23:12:52 +0000] \\\"GET /images/logo_cfo.gif HTTP/1.0\\\" 304 0\",\"@version\":\"1\"}",
                "required": true,
                "paramsDesc": "数据样本, 用来解析数据格式",
                "desc": " ",

                "readOnly": false,
                "type": "textArea"
            }, {
                "name": "rows-per-second",
                "text": "每秒钟生成行数",
                "defaultValue": "10000",
                "required": true,
                "paramsDesc": "一秒之内, 生成多少条数据",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "number-of-rows",
                "text": "一共生成行数",
                "defaultValue": "10000000",
                "required": true,
                "paramsDesc": "本次任务一共要生成多少条数据",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "fields",
                "text": "字段",
                "defaultValue": [],
                "required": true,
                "paramsDesc": "字段生成方式",
                "desc": " ",

                "readOnly": false,
                "type": "array"
            }, {
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'dataGen_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: dataGenIcon,
        height: 90,
        width: "100%"
    },
];
const transform = [
    {
        id: 'DataAggregates',
        text: '时间聚合',
        type: 'png',
        Data: {},
        pluginType: 'transform',
        pluginName: "DataAggregates",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "kafka-source",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "DataAggregates",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "rowtime.watermark.field",
                "text": "时间字段",
                "defaultValue": "_time",
                "required": true,
                "paramsDesc": "时间字段, 必须是13位时间戳类型",
                "desc": " ",
                "readOnly": false,
                "type": "text"
            }, {
                "name": "rowtime.watermark.tumble.ms",
                "text": "翻滚窗口的大小(毫秒)",
                "defaultValue": "60000",
                "required": true,
                "paramsDesc": "翻滚窗口的大小, 单位是毫秒",
                "desc": " ",
                "readOnly": false,
                "type": "digit",
                "digitMin": "10",
                "digitMax": "9999999999"
            }, {
                "name": "rowtime.watermark.tumble.delay.ms",
                "text": "允许数据迟到时间",
                "defaultValue": "60000",
                "required": true,
                "paramsDesc": "允许数据迟到时间, 单位是毫秒",
                "desc": " ",
                "readOnly": false,
                "type": "text"
            }, {
                "name": "group.fields",
                "text": "分组的字段, 回车选择",
                "defaultValue": [],
                "required": true,
                "paramsDesc": "分组的字段, 回车选择",
                "desc": " ",
                "readOnly": false,
                "type": "array"
            }, {
                "name": "custom.fields",
                "text": "自定义聚合字段",
                "defaultValue": [],
                "required": true,
                "paramsDesc": "除了对group.fields字段聚合, 还可以自定义聚合字段, 这里设置的是字段名称",
                "desc": " ",
                "readOnly": false,
                "type": "array"
            },{
                "name": "custom.field.{field}.script",
                "text": "{field}字段表达式",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "{field}字段表达式",
                "desc": " ",
                "readOnly": false,
                "type": "child",
                "father": "custom.fields"
            }, {
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'DataAggregates_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }, {
            id: 'DataAggregates_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: DataAggregatesIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'DecodeBase64',
        text: 'Decode base64',
        type: 'png',
        Data: {},
        pluginType: 'transform',
        pluginName: "DecodeBase64",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "DecodeBase64-transform",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "DecodeBase64",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "source_field",
                "text": "源字段名",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "源字段名",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text"
            }, {
                "name": "target_field",
                "text": "目标字段名",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "目标字段名",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'DecodeBase64_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }, {
            id: 'DecodeBase64_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: debase64Icon,
        height: 90,
        width: "100%"
    },
    {
        id: 'EncodeBase64',
        text: 'Encode base64',
        type: 'png',
        Data: {},
        pluginType: 'transform',
        pluginName: "EncodeBase64",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "EncodeBase64-transform",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "EncodeBase64",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "source_field",
                "text": "源字段名",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "源字段名",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text"
            }, {
                "name": "target_field",
                "text": "目标字段名",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "目标字段名",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Enbase64_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }, {
            id: 'Enbase64_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: enbase64Icon,
        height: 90,
        width: "100%"
    },
    {
        id: 'DataJoin',
        text: 'DataJoin',
        type: 'png',
        Data: {},
        pluginType: 'transform',
        pluginName: "DataJoin",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "DataJoin-transform",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "DataJoin",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            }, {
                "name": "join.source_table_name",
                "text": "需要join的表",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "需要join的表",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "join.secondary.where",
                "text": "join的条件",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "join的条件",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text"
            }, {
                "name": "join.secondary.type",
                "text": "关联类型",
                "defaultValue": "left",
                "required": true,
                "paramsDesc": "关联类型",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "select",
                "selectOptions": [
                    {
                        "value": "left",
                        "label": "左关联"
                    }, {
                        "value": "right",
                        "label": "右关联"
                    }
                ]
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'DataJoin_result_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        },{
            id: 'DataJoin_join_result_table_name',
            orientation: [-1, 0],
            pos: [0, 0.8],
            Class: BaseEndpoint,
            color: 'system-green'
        }, {
            id: 'DataJoin_source_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: dataJoinIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'dataSelector',
        text: 'DataSelector',
        type: 'png',
        Data: {},
        pluginType: 'transform',
        pluginName: "DataSelector",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "DataSelector-transform",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "DataSelector",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "select.result_table_name",
                "text": "生成的流",
                "defaultValue": [],
                "required": true,
                "paramsDesc": "生成的流",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "array"
            },{
                "name": "select.{id}_t1.where",
                "text": "数据{id}_t1, 的条件",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "数据{id}_t1, 的条件",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text_rex_id"
            },{
                "name": "select.{id}_t2.where",
                "text": "数据{id}_t2, 的条件",
                "defaultValue": "",
                "required": true,
                "paramsDesc": "数据{id}_t2, 的条件",
                "desc": " ",
                "display": "none",
                "readOnly": false,
                "type": "text_rex_id"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'DataSelector_result_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        },{
            id: 'DataSelector_t1_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }, {
            id: 'DataSelector_t2_result_table_name',
            orientation: [1, 0],
            pos: [0, 0.8],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: dataSelectorIcon,
        height: 90,
        width: "100%"
    }

];
const sink = [
    {
        id: 'ConsoleSink',
        text: 'ConsoleSink',
        type: 'png',
        Data: {},
        pluginType: 'sink',
        pluginName: "ConsoleSink",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "Console-sink",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "ConsoleSink",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Console_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: devIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'ConsoleSink',
        text: 'ConsoleSink',
        type: 'png',
        Data: {},
        pluginType: 'sink',
        pluginName: "ConsoleSink",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "Console-sink",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "ConsoleSink",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Console_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: devIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'ConsoleSink',
        text: 'ConsoleSink',
        type: 'png',
        Data: {},
        pluginType: 'sink',
        pluginName: "ConsoleSink",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "Console-sink",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "ConsoleSink",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Console_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: devIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'ConsoleSink',
        text: 'ConsoleSink',
        type: 'png',
        Data: {},
        pluginType: 'sink',
        pluginName: "ConsoleSink",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "Console-sink",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "ConsoleSink",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Console_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: devIcon,
        height: 90,
        width: "100%"
    },
    {
        id: 'ConsoleSink',
        text: 'ConsoleSink',
        type: 'png',
        Data: {},
        pluginType: 'sink',
        pluginName: "ConsoleSink",
        pluginOptions: [
            {
                "name": "name",
                "text": "名称",
                "defaultValue": "Console-sink",
                "required": true,
                "paramsDesc": "自定义名称, 显示用",
                "desc": " ",

                "readOnly": false,
                "type": "text"
            }, {
                "name": "plugin_name",
                "text": "插件名称",
                "defaultValue": "ConsoleSink",
                "required": true,
                "paramsDesc": "插件名称, 系统自带, 无需更改",
                "desc": " ",
                "display": "none",
                "readOnly": true,
                "type": "text"
            },{
                "name": "parallelism",
                "text": "并行度",
                "defaultValue": "1",
                "required": true,
                "paramsDesc": "flink并行度设置, 请谨慎设置",
                "desc": " ",

                "readOnly": false,
                "type": "digit"
            }
        ],
        endpoints: [{
            id: 'Console_source_table_name',
            orientation: [-1, 0],
            pos: [0, 0.5],
            Class: BaseEndpoint,
            color: 'system-green'
        }],
        content: devIcon,
        height: 90,
        width: "100%"
    }

];

const data = _.concat(source, transform, sink);
export default data;