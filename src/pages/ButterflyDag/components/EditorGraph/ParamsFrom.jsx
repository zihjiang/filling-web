import React, { useRef, Component, useState } from 'react';
import { Button, message } from 'antd';
import $ from 'jquery';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProField

} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

class ParamsFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataId: "",
      data: {},
      pluginName: "",
      pluginOptions: [],
      initialValues: {}
    }

  }

  componentDidMount() {
  }

  handleUpdate = () => {


    this.setState({
      data: window.canvas.getNode(window.selectNode.id).data,
      pluginName: window.selectNode.options.pluginName,
      pluginOptions: JSON.parse(window.selectNode.options.pluginOptions)
    });
    console.log("window.selectNode: ", window.selectNode);
  }

  updateData = (values) => {

    console.log(window.selectNode.id);
    _.map(window.canvas.nodes, (d) => { if (d.id == window.selectNode.id) d.data = values });

    console.log(values);
  }


  render() {
    let initialValues = this.state.initialValues;
    const pluginOptions = this.state.pluginOptions;
    let data = this.state.data;

    if (pluginOptions) {
      console.log(this.state.data);
      if (this.state.data != undefined) {
        // 编辑
        initialValues = data;
        console.log('编辑');
      } else {
        // 新建
        pluginOptions.forEach((pluginOption) => {
          initialValues[pluginOption.name] = pluginOption['defaultValue'];
        })

        console.log('新建');
      }
    }

    return (
      <>
        <DrawerForm
          title={this.state.pluginName}
          trigger={
            <div onClick={this.handleUpdate}>
              <PlusOutlined />
            </div>
          }
          drawerProps={{
            forceRender: true,
            destroyOnClose: true
          }}
          onFinish={async (values) => {
            // 不返回不会关闭弹框
            this.updateData(values);
            message.success('提交成功');
            return true;

          }}
          width='20%'
          initialValues={initialValues}
        >

          {
            this.state.pluginOptions.map((item, idx) => {
              switch (item.type) {
                case "text":
                  return <ProFormText
                    key={idx}
                    name={item.name}
                    label={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    disabled={item.readOnly}
                    formItemProps={
                      {
                        rules: [
                          {
                            required: item.required,
                            message: `${item.text}是必须的`,
                          },
                        ],
                      }
                    }
                  />
                case "textArea":
                  return <ProFormTextArea
                    key={idx}
                    name={item.name}
                    label={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    disabled={item.readOnly}
                  />
                case "digit":
                  return <ProFormDigit
                    key={idx}
                    name={item.name}
                    label={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    min={item.digitMin}
                    max={item.digitMax}
                    disabled={item.readOnly}
                  />

                case "select":
                  return <ProFormSelect
                    key={idx}
                    name={item.name}
                    abel={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    disabled={item.readOnly}
                    options={item.selectOptions}>
                  </ProFormSelect>

                case "array":
                  return <ProFormTextArea
                    key={idx}
                    name={item.name}
                    abel={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    disabled={item.readOnly}
                    options={item.selectOptions}>
                  </ProFormTextArea>
              }
            })
          }
        </DrawerForm>
      </>
    );
  }
}

export { ParamsFrom };