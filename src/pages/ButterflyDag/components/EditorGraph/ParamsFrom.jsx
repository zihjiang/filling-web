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

class ParamsFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      pluginName: "",
      pluginOptions: [],
      initialValues: {
      }
    }

  }

  componentDidMount() {
  }

  handleUpdate = () => {


    this.setState({
      data: window.selectNode.options.Data,
      pluginName: window.selectNode.options.pluginName,
      pluginOptions: JSON.parse(window.selectNode.options.pluginOptions)
    });
    console.log("window.selectNode: ", window.selectNode);
  }


  render() {
    let initialValue = this.state.initialValues;

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
          console.log(values.name);
          message.success('提交成功');
          // 不返回不会关闭弹框
          return true;
        }}
        width='20%'
        initialValues={initialValue}
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
                  initialValue={item.defaultValue}
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
                  initialValue={item.defaultValue}
                  style={{ display: item.display }}
                  disabled={item.readOnly}
                />
              case "digit":
                return <ProFormDigit
                  key={idx}
                  name={item.name}
                  label={item.text}
                  placeholder={item.paramsDesc}
                  initialValue={item.defaultValue}
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
                  initialValue={item.defaultValue}
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
                  initialValue={item.defaultValue}
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