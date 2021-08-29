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

      // data: window.canvas.getNode(window.selectNode.id).data == undefined ? window.canvas.getNode(window.selectNode.id).options.data : window.canvas.getNode(window.selectNode.id).data,
      data: window.selectNode.options.data,
      pluginName: window.selectNode.options.pluginName,
      pluginOptions: JSON.parse(window.selectNode.options.pluginOptions)
    });

    // this._forceUpdate({1: 1});
  }

  // 更新node的数据
  updateData = (values) => {

    _.map(window.canvas.nodes, (d) => { if (d.id == window.selectNode.id) d.options.data = _.merge(d.options.data, values) });
  }

  _forceUpdate = (values) => {


    let initialValues01 = this.state.initialValues;
    let pluginOptions01 = this.state.pluginOptions;

    initialValues01[Object.keys(values)[0]] = Object.values(values)[0];

    pluginOptions01.map((item) => {

      if (item.name == Object.keys(values)[0]) {
        item.defaultValue = Object.values(values)[0];
      }
    })

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
        // initialValues = data;

        

        pluginOptions.forEach((pluginOption) => {
          // if(pluginOption.type == "array") {
          //   if(_.find(pluginOptions, (d) => {return d.father == pluginOption.father })) {
              
          //   }
          // }
          initialValues[pluginOption.name] = data[pluginOption.name];
        })

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
                    label={item.text}
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
                    label={item.text}
                    placeholder={item.paramsDesc}
                    style={{ display: item.display }}
                    disabled={item.readOnly}
                    options={item.selectOptions}>

                  </ProFormSelect>

                case "text_rex_id":
                    return <ProFormText
                      key={idx}
                      name={item.name.replace("{id}", window.selectNode.id)}
                      label={item.text.replace("{id}", window.selectNode.id)}
                      placeholder={item.paramsDesc.replace("{id}", window.selectNode.id)}
                      style={{ display: item.display }}
                      disabled={item.readOnly}
                      options={item.selectOptions}>
                    </ProFormText>

                case "child":
                    return (_.find(this.state.pluginOptions, (d) => { return d.name == item.father }) || []).defaultValue.map((_item, _idx) => {
                      return <ProFormText
                        key={idx + _idx}
                        name={item.name.replace("{field}", _item)}
                        label={item.text.replace("{field}", _item)}
                        placeholder={item.paramsDesc.replace("{field}", _item)}
                        style={{ display: item.display }}
                        disabled={item.readOnly}
                        onClick={(d) => console.log(d)}
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