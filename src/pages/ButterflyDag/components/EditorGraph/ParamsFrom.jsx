import React, { useRef, Component } from 'react';
import { Button, message } from 'antd';
import $ from 'jquery';
import ProForm, {
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

class ParamsFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {

      }
    }

  }

  componentDidMount() {

    
    
  }

  handleUpdate = () => {

    this.setState({
      data: window.selectNode.options.Data
    });
    console.log("window.selectNode: ", window.selectNode.options.Data);
    console.log( window.selectNode.options.Data);
  }


  render() {
    return (
      <DrawerForm
        title= { this.state.data.plugin_name }
        trigger={
          <div onClick={this.handleUpdate}>
            <PlusOutlined />
            {1}
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
      >
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="source_table_name" id="source_table_name" placeholder="source_table_name" initialValue={ this.state.data.result_table_name } />
          <ProFormText width="md" name="contract" label="result_table_name" id="result_table_name"  placeholder="result_table_name" />
        </ProForm.Group>
        
        <ProFormText width='md' name="id" label="主合同编号" />
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="md" name="mangerName" disabled label="商务经理" initialValue="启途" />
      </DrawerForm>
    );
  }
}

export { ParamsFrom };