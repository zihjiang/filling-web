import React, { Component } from 'react';
import { Canvas } from 'butterfly-dag';

import 'butterfly-dag/dist/index.css';
import './index.less';
import { ParamsFrom } from './ParamsFrom';
import * as HotKeyPlugin from 'butterfly-dag/plugins/hotkey/dist/index.unpkg.js';
import BaseEdge from './edge';
import { notification } from 'antd';
import _ from 'lodash';

// import * as panelPlugins from 'butterfly-dag/plugins/panel/dist/index.js';


class EditorGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // 为每个算子添加source_table_name和target_table_name
  addSourceAndTarget = (sourceNode, targetNode, edge) => {

    if (sourceNode.options.data == undefined) {
      // init data
      sourceNode.options.data = {};
      const pluginOptions = JSON.parse(sourceNode.options.pluginOptions);
      for (let i = 0; i < pluginOptions.length; i++) {
        let option = pluginOptions[i];

        sourceNode.options.data[option.name] = option.defaultValue;
      }
    }

    // 默认以node id为target_table_name
    if (sourceNode.options.PluginType != 'sink')
      sourceNode.options.data['target_table_name'] = sourceNode.id;

    if (targetNode.options.data == undefined) {
      // init data
      targetNode.options.data = {};
      const pluginOptions = JSON.parse(targetNode.options.pluginOptions);
      for (let i = 0; i < pluginOptions.length; i++) {
        let option = pluginOptions[i];

        targetNode.options.data[option.name] = option.defaultValue;
      }
    }

    // 默认以node id为source_table_name
    if (targetNode.options.PluginType != 'source')
      targetNode.options.data['source_table_name'] = sourceNode.id;

    // 当选择datajoin第二根线的时候
    if (edge.targetEndpoint.id == 'DataJoin_join_result_table_name') {

      targetNode.options.data['join.source_table_name'] = sourceNode.id;
    }

    // pluginName为DataSelecter时, 特殊处理
    if (sourceNode.options.pluginName == 'DataSelecter') {

      // 当选择dataSelecter第一根线的时候
      if (edge.sourceEndpoint.id == 'DataSelecter_t1_result_table_name') {

        targetNode.options.data['source_table_name'] = sourceNode.id + 't1';

        sourceNode.options.data['select.result_table_name'][0] = sourceNode.id+'_t1';

      }

      // 当选择dataSelecter第一根线的时候
      if (edge.sourceEndpoint.id == 'DataSelecter_t2_result_table_name') {

        targetNode.options.data['source_table_name'] = sourceNode.id + 't2';

        sourceNode.options.data['select.result_table_name'][1] = sourceNode.id+'_t2';
      }
    }


    _.map(window.canvas.nodes, (d) => { if (d.id == sourceNode.id) d = sourceNode; if (d.id == targetNode.id) d = targetNode });



    // _.map(window.canvas.nodes, (d) => { if (d.id == sourceNode.id) { d = sourceNode } if (d.id == targetNode.id) { d = targetNode } });

  }
  componentDidMount() {
    const data = this.props.data;

    let root = document.getElementById('dag-canvas');
    this.canvas = new Canvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: false,    // 可放大
      moveable: true,    // 可平移
      theme: {
        edge: {
          type: 'endpoint',    //线段连接类型
          shapeType: 'Bezier', //线条默认类型
          arrow: true,         //线条默认是否带箭头
          arrowPosition: 0.5,  //箭头位置(0 ~ 1)
          arrowOffset: 0.0,    //箭头偏移
          isExpandWidth: false,//增加线条交互区域
          shapeType: "AdvancedBezier",
          Class: BaseEdge,
          defaultAnimate: true//默认开启线条动画
        },
        endpoint: {
          position: [],        //限制锚点位置['Top', 'Bottom', 'Left', 'Right'],
          linkableHighlight: true,//连线时会触发point.linkable的方法，可做高亮
          expandArea: {        //锚点过小时，可扩大连线热区
            left: 10,
            right: 10,
            top: 10,
            botton: 10
          }
        },
      }
    });
    this.canvas.draw(data, () => {
      this.canvas.setGridMode(true, {
        isAdsorb: true,         // 是否自动吸附,默认关闭
        theme: {
          shapeType: 'circle',     // 展示的类型，支持line & circle
          gap: 20,               // 网格间隙
          background: 'rgba(0, 0, 0, 0.65)',     // 网格背景颜色
          circleRadiu: 1.5,        // 圆点半径
          circleColor: 'rgba(255, 255, 255, 0.8)'    // 圆点颜色
        }
      });
    });
    this.canvas.setMinimap(true);

    this.canvas.on('system.link.connect', (data) => {

      console.log(data);
      if (data != null) {
        for (let i = 0; i < data.links.length; i++) {
          const edge = data.links[i];
          const edgeId = edge.id;
          const sourceNode = edge.sourceNode;
          const targetNode = edge.targetNode;

          const targetEndpoint = edge.targetEndpoint;

          if (targetNode.options['PluginType'] == "source") {
            this.openNotification("warning", "提示", "任何情况下, 源都不准被允许放在箭头后面");
            this.canvas.removeEdge(edgeId);
          } else if (sourceNode.options['PluginType'] == "sink") {
            this.openNotification("warning", "提示", "任何情况下, 源目标都不准被允许放在箭头前面");
            this.canvas.removeEdge(edgeId);
          } else if (_.difference(edge.sourceEndpoint.orientation, [-1, 0]).length == 0) {
            this.openNotification("warning", "提示", "任何情况下, 源目标都不准连在前面");
            this.canvas.removeEdge(edgeId);
          } else if (targetNode.options['id'] == sourceNode.options['id']) {
            this.openNotification("warning", "提示", "连线前后的算子不可一致");
            this.canvas.removeEdge(edgeId);


            // 只有在pluginName不等于DataJoin的时候才触发
          } else if (_.filter(this.canvas.edges, (d) => { return d.targetEndpoint.nodeId == targetEndpoint.nodeId }).length > 1 && targetNode.options.pluginName != "DataJoin") {

            this.openNotification("warning", "提示", "同一个算子下同一个连接点的输入, 不能有两个");
            this.canvas.removeEdge(edgeId);
          } else {

            console.log("正常操作");
            // let 
            this.addSourceAndTarget(window.canvas.getNode(sourceNode.id), window.canvas.getNode(targetNode.id), edge);
          }
        }
      }
    });

    this.canvas.on('system.link.click', (data) => {
      window.selectEdge = data.edge;
      window.selectNodeOrEdge = data.edge;
      console.log(data);
    })

    window.canvas = this.canvas;
  }

  openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      duration: 3,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  render() {
    return (
      <div className='litegraph-page'>
        <div className='litegraph-canvas' id='dag-canvas'></div>
        <div id="ParamsFrom">
          <ParamsFrom />
        </div>
      </div>
    );
  }
}

export { EditorGraph };
