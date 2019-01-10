import React, { Component } from 'react';
import { Table, Divider, Tag ,Modal, Button,
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete,} from 'antd';
import {connect} from 'dva';
import styles from './list.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
@Form.create()
class List extends Component {
    constructor () {
        super()
        this.state = { 
            visible: false,
            visible_1: false,
            confirmDirty: false,
            autoCompleteResult: [],
            Moveid:0,
            Changeid:0,
            columns : [{
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: text => <a href="javascript:;">{text}</a>,
              },{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
              }, {
                title: 'IMG',
                dataIndex: 'img',
                key: 'img',
                render: text => <img src={text} alt="" className={styles.Img}/>,
              }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
              }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span className={styles.spn}>
                    <a href="javascript:;">Invite {record.info}</a>
                    <Divider type="vertical" />
                    <a href="javascript:void(0);"  onClick={()=>{this.showModal(record.id)}}>编辑</a>
                    <a href="javascript:void(0);" onClick={()=>{this.showModalMove(record.id)}}>删除</a>
                  </span>
                ),
              }],
              residences :[{
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
                              label: 'Zhong Hua Men',
                        }],
                    }],
            }]
        }
    }
    componentDidMount () {
      let {dispatch} =this.props;
      dispatch({
          type:'shop/getshopList'
      })
    }
    showModal = (id) => {
        let {dispatch} =this.props;
        this.setState({
          visible: true,
          Changeid:id
        });
        dispatch({
          type:'shop/getObj',
          id
        })
        
    }
    handleOk = (e) => {
      let {dispatch} =this.props;
      this.setState({
          visible: false,
      });
      dispatch({
        type:'shop/changeObj',
        payload:{id:this.state.Changeid,obj:this.props.form.getFieldsValue()}
      })
      this.props.form.resetFields();
    }

    handleCancel = (e) => {
      this.setState({
          visible: false,
      })
    }

    showModalMove= (id) => {
        this.setState({
          visible_1: true,
          Moveid:id
        });
    }
  
    handleOkMove = (e) => {
      let {dispatch} =this.props;
      this.setState({
          visible_1: false,
      });
      dispatch({
        type:'shop/changeshopList',
        id:this.state.Moveid
      })
    }

    handleCancelMove = (e) => {
      this.setState({
          visible_1: false,
      })
    }

    render() {
        let {obj} = this.props;
        const { getFieldDecorator } = this.props.form;

        const { autoCompleteResult ,residences} = this.state;

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

        const prefixSelector = getFieldDecorator('prefix', {
          initialValue: '86',
        })(
          <Select style={{ width: 70 }}>
            <Option value="86">+95</Option>
            <Option value="87">+95</Option>
          </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.props.shopList} />
                <Modal
                    title="店面信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label="Name"
                    >
                      {getFieldDecorator('name',{initialValue:obj.name}, {
                        rules: [{
                          type: 'text',
                        }] 
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Address"
                    >
                      {getFieldDecorator('address',{initialValue:obj.address},  {
                        rules: [{
                          required: true,
                        }, {
                          validator: this.compareToFirstPassword,
                        }],
                      })(
                        <Input type="text" />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                          Info
                        </span>
                      )}
                    >
                      {getFieldDecorator('info',{initialValue:obj.info},  {
                        rules: [{ required: true, whitespace: true }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Form>
              </Modal>
              <Modal
                    title="Basic Modal"
                    visible={this.state.visible_1}
                    onOk={this.handleOkMove}
                    onCancel={this.handleCancelMove}
                >
                <p>你确定要删除吗</p>
              </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {...state.shop}
}
export default connect(mapStateToProps)(List);