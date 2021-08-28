import React, { useRef, Component, useState } from 'react';
import { Button, message, Select } from 'antd';
import {
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

      data: window.canvas.getNode(window.selectNode.id).data == undefined ? window.canvas.getNode(window.selectNode.id).options.data : window.canvas.getNode(window.selectNode.id).data,
      pluginName: window.selectNode.options.pluginName,
      pluginOptions: JSON.parse(window.selectNode.options.pluginOptions)
    });
  }

  // 更新node的数据
  updateData = (values) => {

    _.map(window.canvas.nodes, (d) => { if (d.id == window.selectNode.id) d.options.data = values });
  }

  _forceUpdate = (values) => {

    // this.state.initialValues.map((item) => {

    //   if(item.name == Object.keys(values)[0]) {
    //     item.defaultValue = Object.values(values)[0];
    //   }
    // })

    let initialValues01 = this.state.initialValues;
    let pluginOptions01 = this.state.pluginOptions;

    console.log('values', values);

    console.log('values', Object.keys(values)[0]);
    console.log('values', Object.values(values)[0]);

    initialValues01[Object.keys(values)[0]] = Object.values(values)[0];

    console.log(initialValues01['select.result_table_name']);


    pluginOptions01.map((item) => {

      if(item.name == Object.keys(values)[0]) {
        item.defaultValue = Object.values(values)[0];
      }
    })

    console.log(pluginOptions01);

    this.setState({
      initialValues: initialValues01,
      pluginOptions: pluginOptions01
    })

    
    
  }


  render() {
    let initialValues = this.state.initialValues;
    const pluginOptions = this.state.pluginOptions;
    let data = this.state.data;

    if (pluginOptions) {
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
          onValuesChange={(value) => this._forceUpdate(value)}
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
                  return <ProFormSelect
                    key={idx}
                    mode="tags"
                    name={item.name}
                    abel={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    // disabled={item.readOnly}
                    options={item.selectOptions}>

                  </ProFormSelect>
                  
                case "child":
                  return (_.find(this.state.pluginOptions, (d) => { return d.name==item.father}) || []).defaultValue.map((_item, _idx) => {
                    return  <ProFormText
                      key={idx+_idx}
                      name={item.name.replace("{}", _item)}
                      abel={item.text}
                      placeholder={item.paramsDesc.replace("{}", _item)}
                      style={{ display: item.display }}
                      disabled={item.readOnly}
                      onValuesChange={this._forceUpdate}
                      options={item.selectOptions}>
                    </ProFormText>
                  })
              }
            })
          }
        </DrawerForm>
      </>
    );
  }
}

export { ParamsFrom };