// import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';

// import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';
// import { panelPlugins } from './panelPlugins';
import { panelPluginsInstance } from './panelPlugins';
import './index.less';
import { Component } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import data from './data';
class EditorPanel extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {


        this.canvas = window.canvas;

        // panelPluginsInstance.PanelNode = BaseNode;

        panelPluginsInstance.register(
            [
                {
                    root: document.getElementById('dnd'),
                    canvas: this.canvas,
                    // type: 'basic',
                    height: 90,
                    data: data,
                },
            ], () => {
                console.log('finish')
            }
        );


    }

    render() {
        return (
            <>
                <ProFormSelect
                    options={[
                        {
                            value: 'all',
                            label: '所有',
                        },
                        {
                            value: 'source',
                            label: '源',
                        },
                        {
                            value: 'transfrom',
                            label: '算子',
                        },
                        {
                            value: 'sink',
                            label: '目标源',
                        }
                    ]}
                    style={{
                        margin: 16,
                    }}
                    name="selectMode"
                />
                <div className="dnd" id="dnd"></div>
            </>
        );
    }
}
export { EditorPanel };