// import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';

import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';
// import { panelPlugins } from './panelPlugins';
// import {panelPluginsInstance}  from './panelPlugins';
import './index.less';
import { Component } from 'react';
import ProForm, {
    ProFormSelect,
  } from '@ant-design/pro-form';
  import kafkaIcon from './images/kafka.png';
  import jdbsIcon from './images/jdbc.png';
  import BaseNode from '../EditorGraph/node';
class EditorPanel extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {


        this.canvas = window.canvas;

        console.log(panelPluginsInstance);

        // panelPluginsInstance.PanelNode = BaseNode;

        panelPluginsInstance.register(
        [
            {
            root: document.getElementById('dnd'),
            canvas: this.canvas,
            // type: 'basic',
            height: 90,
            data: [
                {
                  id: 'kafka',
                  type: 'png',
                  content: kafkaIcon,
                  height: 90,
                  width: "100%"
                },
                {
                    id: 'jdbc',
                    type: 'png',
                    content: jdbsIcon,
                    height: 90,
                    width: "100%"
                  }
              ]
            },
        ],() => {
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