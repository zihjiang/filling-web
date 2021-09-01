import {
    DeleteFilled,
    UndoOutlined,
    RedoOutlined,
    LayoutFilled,
    PlayCircleFilled,
    BugFilled,
    CheckCircleFilled,
    ZoomOutOutlined,
    ZoomInOutlined,
    SaveFilled,
    DownloadOutlined,
    SelectOutlined,
    FormOutlined
} from '@ant-design/icons';
import React, { Component } from 'react';
import './index.less';
import { message } from 'antd';
import { addFillingJobs, updateFillingJobs, patchFillingJobs } from '@/pages/FillingJobs/service';


class EditorToolbar extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    componentDidMount() {

    }

    // 删除节点或线条
    deleteNodeAndEdge = () => {
        let selectNodeOrEdge = window.selectNodeOrEdge;
        if (selectNodeOrEdge != undefined && selectNodeOrEdge['id']) {
            if (selectNodeOrEdge.type == 'endpoint') {
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
    zoomIn = () => {
        window.canvas.zoom(canvas.getZoom() + 0.1);
    }
    zoomInOut = () => {
        window.canvas.zoom(canvas.getZoom() - 0.1);
    }

    debugMode = () => {
        const data = window.canvas.getDataMap();
        console.log(this.deCodeDataMap(data));
        console.log(JSON.stringify(this.deCodeDataMap(data)));
    }

    save = async (entity) => {

        message.loading('正在保存');
        try {
            const data = window.canvas.getDataMap();
            console.log(entity);
            const jobText = JSON.stringify(this.deCodeDataMap(data));
            await patchFillingJobs(3, { data: { jobText: jobText } });
            message.loading('保存成功');
            return true;
        } catch (error) {
            message.error('保存失败请重试！');
            return false;
        }
    }

    // 把canvas对象data换成能序列化的对象
    deCodeDataMap = (dataMap) => {
        let result = {
            nodes: [],
            edges: []
        };
        const { nodes, edges } = dataMap;
        // node
        // const nodeClass = Class;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            let _endpoints = [];
            const { id, data, top, width, left, height, options, endpoints } = node;
            for (let j = 0; j < endpoints.length; j++) {
                const endpoint = endpoints[j];
                const { id, orientation, pos } = endpoint;
                _endpoints.push({ id, orientation, pos });
            }
            const _node = { id, data, top, width, left, height };
            _node['endpoints'] = _endpoints;

            _node['pluginOptions'] = options.pluginOptions;
            _node['PluginType'] = options.PluginType;
            _node['pluginName'] = options.pluginName;
            _node['data'] = options.data;
            _node['text'] = options.text;
            // _node['data'] = options.data;
            result.nodes.push(_node);
        }
        // edges
        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            const { id, source, target, sourceEndpoint, targetEndpoint, sourceNode, targetNode, type } = edge;
            const _edge = { id, source, target, type };
            _edge.source = sourceEndpoint.id;
            _edge.target = targetEndpoint.id;

            _edge.sourceNode = sourceNode.id;
            _edge.targetNode = targetNode.id;
            result.edges.push(_edge);
        }

        return result;
    }

    render() {
        return (
            <div className="main">
                <DeleteFilled onClick={this.deleteNodeAndEdge} title="删除" />
                <UndoOutlined onClick={this.undo} title="撤销" />
                <RedoOutlined onClick={this.redo} title="恢复" />
                <LayoutFilled onClick={this.autoLayout} title="自动对齐" />
                <ZoomInOutlined onClick={this.zoomIn} title="放大" />
                <ZoomOutOutlined onClick={this.zoomInOut} title="缩小" />
                <BugFilled title="调试" onClick={this.debugMode} />
                <SaveFilled title="保存" onClick={this.save} />
                <CheckCircleFilled title="检查" />
                <PlayCircleFilled title="启动" />
                <DownloadOutlined title="下载" />
                <SelectOutlined title="另存为" />
                <FormOutlined title="编辑通用信息" />
            </div>
        );
    }
}
export default EditorToolbar;