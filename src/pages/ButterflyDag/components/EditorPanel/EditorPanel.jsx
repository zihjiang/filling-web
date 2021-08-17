// import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';

import * as panelPluginsInstance from 'butterfly-dag/plugins/panel/dist/index.js';
// import { panelPlugins } from './panelPlugins';
// import {panelPluginsInstance}  from './panelPlugins';
import './index.less';
import { Component } from 'react';
import ProForm, {
    ProFormSelect,
  } from '@ant-design/pro-form';

class EditorPanel extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {


        this.canvas = window.canvas;

        panelPluginsInstance.register(
        [
            {
            root: document.getElementById('dnd'),
            canvas: this.canvas,
            type: 'basic',
            width: 40,
            height: 40,
            data: [
                {
                  id: 'user-baidu-1',
                  type: 'png',
                  content: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
                  with: 10,
                  height: 40,
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