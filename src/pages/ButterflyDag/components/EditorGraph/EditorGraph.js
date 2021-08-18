import React, {Component} from 'react';
import {Canvas} from 'butterfly-dag';

import 'butterfly-dag/dist/index.css';
import './index.less';
import { ParamsFrom } from './ParamsFrom';

import * as HotKeyPlugin from 'butterfly-dag/plugins/hotkey/dist/index.unpkg.js';
import BaseEdge from './edge';

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
          label: 'test',       //线条默认label
          arrow: true,         //线条默认是否带箭头
          arrowPosition: 0.5,  //箭头位置(0 ~ 1)
          arrowOffset: 0.0,    //箭头偏移
          isExpandWidth: false,//增加线条交互区域
          shapeType: "AdvancedBezier",
          Class: BaseEdge
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


    
    HotKeyPlugin.register({
      canvas: this.canvas,
      root:document,
      config:[{
        key: "ctrl+M",
        handler: () => {
          console.log("ctrl+M");
        }
      },
      {
        key: 'A',
        handler: () => {
          console.log("A");
        }
      }]
    })
    window.canvas = this.canvas;
    window.canvas.emit('unfocus', () => {console.log(1)})
  }

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
