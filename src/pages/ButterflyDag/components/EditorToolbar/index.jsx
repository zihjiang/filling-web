import { DeleteFilled, 
    UndoOutlined, 
    RedoOutlined,
    LayoutFilled, 
    PlayCircleFilled,
    BugFilled,
    CheckCircleFilled,
    ZoomOutOutlined,
    ZoomInOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import './index.less';

class EditorToolbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    // 删除节点或线条
    deleteNodeAndEdge = () => {
        let selectNodeOrEdge = window.selectNodeOrEdge;
        if(selectNodeOrEdge != undefined && selectNodeOrEdge['id'] ) {
          if(selectNodeOrEdge.type == 'endpoint') {
            window.canvas.removeEdge(selectNodeOrEdge['id']);
          } else {
            window.canvas.removeNode(selectNodeOrEdge['id']);
          }
        }
    }

    // 恢复
    undo = () => {
        window.canvas.undo();
    }
    // 还原
    redo = () => {
        window.canvas.undo();
    }
    // 自动对齐
    autoLayout = () => {
        window.canvas.autoLayout('dagreLayout', {
            'rankdir': 'LR',
            'nodesep': 50,
            'ranksep': 50,
            'controlPoints': false,
          });
    }
    zoomIn = () =>  {
        window.canvas.zoom(canvas.getZoom()+0.1);
    }
    zoomInOut = () =>  {
        window.canvas.zoom(canvas.getZoom()-0.1);
    }

    debugMode = () => {
        const data = window.canvas.getDataMap();
        console.log(data);
    }
  
    render() {
        return (
            <div className="main">
                <DeleteFilled onClick={this.deleteNodeAndEdge} title="删除"/>
                <UndoOutlined onClick={this.undo} title="撤销"/>
                <RedoOutlined onClick={this.redo} title="恢复"/>
                <LayoutFilled onClick={this.autoLayout} title="自动对齐"/>
                <ZoomInOutlined onClick={this.zoomIn} title="放大"/>
                <ZoomOutOutlined onClick={this.zoomInOut} title="缩小"/>
                <BugFilled title="调试" onClick={this.debugMode}/>
                <CheckCircleFilled title="检查"/>
                <PlayCircleFilled title="启动"/>
            </div>
        );
    }
}
export default EditorToolbar;