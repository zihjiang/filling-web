import React, {Component} from 'react';
import {Canvas} from 'butterfly-dag';

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
      initValue: '1'
    }
  }
  
  componentDidMount() {
    const data = this.props.data;

    let root = document.getElementById('dag-canvas');
    this.canvas = new Canvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
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
        }
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
      if(data != null) {
        for(let i=0;i<data.links.length; i++) {
          const edge = data.links[i];
          const edgeId = edge.id;
          const sourceNode = edge.sourceNode;
          const targetNode = edge.targetNode;

          const targetEndpoint = edge.targetEndpoint;
  
          console.log(targetNode.options);
          if(targetNode.options['PluginType'] == "source") {
            this.openNotification("warning", "提示", "任何情况下, 源都不准被允许放在箭头后面");
            this.canvas.removeEdge(edgeId);
          }  
          if(sourceNode.options['PluginType'] == "sink") {
            this.openNotification("warning", "提示", "任何情况下, 源目标都不准被允许放在箭头前面");
            this.canvas.removeEdge(edgeId);
          }  
          if(_.difference(edge.sourceEndpoint.orientation, [-1, 0]).length == 0) {
            this.openNotification("warning", "提示", "任何情况下, 源目标都不准连在前面");
            this.canvas.removeEdge(edgeId);
          }  
          if(targetNode.options['id'] == sourceNode.options['id']) {
            this.openNotification("warning", "提示", "连线前后的算子不可一致");
            this.canvas.removeEdge(edgeId);
          }  
          if(_.filter(this.canvas.edges, (d) => {return d.targetEndpoint.nodeId == targetEndpoint.nodeId}).length >1 ) {
            // 只有在pluginName不等于DataJoin的时候才触发
            if(targetNode.options.pluginName != "DataJoin") {
              this.openNotification("warning", "提示", "同一个算子下同一个连接点的输入, 不能有两个");
              this.canvas.removeEdge(edgeId);
            }
          }  
        }
      }
    });

    this.canvas.on('system.link.click', (data) => {
      window.selectEdge = data.edge;
      window.selectNodeOrEdge = data.edge;
      console.log(data);
    })


    
    HotKeyPlugin.register({
      canvas: this.canvas,
      root:document,
      config:[{
        key: "delete",
        handler: () => {
          let selectNodeOrEdge = window.selectNodeOrEdge;
          if(selectNodeOrEdge != undefined && selectNodeOrEdge['id'] ) {
            if(selectNodeOrEdge.type == 'endpoint') {
              this.canvas.removeEdge(selectNodeOrEdge['id']);
            } else {
              this.canvas.removeNode(selectNodeOrEdge['id']);
            }
          }
        }
      }]
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
                {/* 弹出 */}
          <div id="ParamsFrom">
            <ParamsFrom />
          </div>
      </div>
    );
  }
}

export { EditorGraph };
