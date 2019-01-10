import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {connect} from 'dva'

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men gu',
      }],
    }],
  }];
  @Form.create()
  class Add extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      index:0
    };
  
    handleSubmit = (e) => {
      let {dispatch} =this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let obj={
            name:values.name,
            address:values.address,
            info:values.info,
            img:'http://pic1.win4000.com/wallpaper/2018-08-27/5b8357204f8b6.jpg',
            city:values.city
          }
          dispatch({
            type:'shop/addshopList',
            obj
          })
        }
      });
    }
    // validateToNextPassword = (rule, value, callback) => {
    //   const form = this.props.form;
    //   if (value && this.state.confirmDirty) {
    //     form.validateFields(['confirm'], { force: true });
    //   }
    //   callback();
    // }
  
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        <Form>
          <FormItem
            {...formItemLayout}
            label="Name"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please input your Name!',
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Address"
          >
            {getFieldDecorator('address', {
              rules: [{
                required: true, message: 'Please input your address!',
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Info"
          >
            {getFieldDecorator('info', {
              rules: [{
                required: true, message: 'Please confirm your info!',
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="City"
          >
            {getFieldDecorator('city', {
              rules: [{
                required: true, message: 'Please confirm your city!',
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Img"
          >
            {getFieldDecorator('img', {
              rules: [{
                required: true, message: 'Please confirm your img!',
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
          </FormItem>
        </Form>
      );
    }
  }
const mapStateToProps = (state)=>{
  return {...state.shop}
}
export default connect(mapStateToProps)(Add);