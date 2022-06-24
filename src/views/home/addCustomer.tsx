import React, { useState, useEffect } from 'react';
import { Button, Space, Select, Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import CostomCom from '@/components/costomCom/costomCom';
import { useNavigate } from 'react-router-dom';

const { Option } = Select
const treeData = [
    {
        title: '青岛未来移动医疗科技有限公司',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: '北京',
                value: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '魏笑',
                        value: '0-0-0-0',
                        key: '0-0-0-0'
                    }
                ]
            },
            {
                title: '运营与销售管理部',
                value: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '曲婷婷',
                        value: '0-1-0',
                        key: '0-1-0',
                    },
                    {
                        title: '魏笑',
                        value: '0-1-1',
                        key: '0-1-1',
                    }
                ],
            },
        ],
    }
];

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];


const schema = {
    labelWidth: 140,
    type: 'object',
    displayType: 'row',
    properties: {
        line1: {
            title: '',
            props: {
                titles: "基础信息",
            },
            type: 'string',
            widget: 'lines'
        },
        input1: {
            title: '客户公司名称',
            type: 'string',
            required: true,
        },
        tree1: {
            title: '负责人',
            type: 'array',
            props: {
                treeData,
                multiple: true,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        tree2: {
            title: '协同人',
            type: 'array',
            items: {
                type: 'string',
            },
            props: {
                treeData,
                multiple: true,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        multiSelect1: {
            title: '标签',
            type: 'array',
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['默认标签', '标签1', '标签2', '标签3'],
            widget: 'multiSelect',
        },
        rate1: {
            title: '重要程度',
            type: 'number',
            widget: 'rate', // 会强制使用 select 组件
        },
        input2: {
            title: '客户简介',
            type: 'string',
        },
        line2: {
            title: '',
            props: {
                titles: "系统信息",
            },
            type: 'string',
            widget: 'lines'
        },
        tree3: {
            title: '创建人',
            type: 'string',
            required: true,
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        input3: {
            title: '客户来源',
            type: 'string',
        },
        select1: {
            title: '客户状态',
            type: 'string',
            enum: ['A', 'B', 'C',],
            enumNames: ['成交客户', '重点意向客户', '其他潜在客户'],
            widget: 'select'
        },
        input4: {
            title: '国际区域',
            type: 'string',
        },
        select2: {
            title: '国家',
            type: 'string',
            enum: ['A', 'B', 'C',], //搜索value列表
            enumNames: ['美国', '法国', '德国'], //搜索label列表
            props: {
                allowClear: true, //支持清空
                showSearch: true, //支持搜索
                optionFilterProp: "label" //指定搜索值
            },
            widget: 'select'
        },
        input5: {
            title: '详细地址',
            type: 'string',
        },
        input6: {
            title: '授权范围',
            type: 'string',
        },
        input7: {
            title: '联系人姓名',
            type: 'string',
        },
        input8: {
            title: '联系人职位',
            type: 'string',
        },
        input9: {
            title: '联系人邮箱',
            type: 'string',
            rules: [{
                type: 'email',
                message: '请输入正确的邮箱格式'
            }]
        },
        input10: {
            title: '手机号码',
            type: 'string',
            rules: [{
                len: 11,
                message: '请输入正确的手机号码格式'
            }]
        },
        upload1: {
            title: '附加图片',
            type: 'string',
            widget: 'upload',
            props: {
                action: '',//上传地址
            }
        },
        upload2: {
            title: '附加文件',
            type: 'string',
            widget: 'upload',
            props: {
                action: '',//上传地址
            }
        },
        textarea1: {
            title: '备注',
            type: 'string',
            widget: 'textarea'
        }
    },
};


const schema2 = {
    labelWidth: 140,
    type: 'object',
    displayType: 'row',
    properties: {
        line1: {
            title: '',
            props: {
                titles: "基础信息",
            },
            type: 'string',
            widget: 'lines'
        },
        input1: {
            title: '客户公司名称',
            type: 'string',
            required: true,
        },
        input10: {
            title: '客户姓名',
            type: 'string',
            required: true,
        },
        select2: {
            title: '性别',
            type: 'string',
            required: true,
            enum: ['A', 'B',], //搜索value列表
            enumNames: ['男', '女'], //搜索label列表
            widget: 'select'
        },
        input11: {
            title: '联系电话',
            type: 'string',
            required: true,
            rules: [{
                len: 11,
                message: '请输入正确的手机号码格式'
            }]
        },
        input2: {
            title: '微信',
            type: 'string',
        },
        cascader1: {
            title: '客户地址',
            type: 'array',
            required: true,
            props: {
                options: options,
            },
            widget: 'Cascader',
        },
        textarea2: {
            required: true,
            title: '详细地址',
            type: 'string',
            widget: 'textarea'
        },
        input12: {
            title: '爱好',
            type: 'string',
        },
        select3: {
            title: '客户阶段',
            type: 'string',
            required: true,
            enum: ['A', 'B', 'C', 'D', 'E', 'F'], //搜索value列表
            enumNames: ['初步了解', '确认需求', "介绍项目", '商务谈判', "成交", "流失"], //搜索label列表
            widget: 'select'
        },
        tree1: {
            title: '负责人',
            type: 'array',
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        tree2: {
            title: '协同人',
            type: 'array',
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        tree3: {
            title: '创建人',
            type: 'string',
            required: true,
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        tree4: {
            title: '上级客户',
            type: 'array',
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
    },
}

const schema3 = {
    labelWidth: 140,
    type: 'object',
    displayType: 'row',
    properties: {
        line1: {
            title: '',
            props: {
                titles: "基础信息",
            },
            type: 'string',
            widget: 'lines'
        },
        input1: {
            title: '医院名称',
            type: 'string',
            required: true,
        },
        input12: {
            title: '城市',
            type: 'string',
            required: true,
        },
        select21: {
            title: '医院级别',
            type: 'string',
            enum: ['A', 'B', 'C',], //搜索value列表
            enumNames: ['A级', 'B级', 'C级'], //搜索label列表
            props: {
                allowClear: true, //支持清空
                showSearch: true, //支持搜索
                optionFilterProp: "label" //指定搜索值
            },
            widget: 'select'
        },
        input111: {
            title: '代理商公司名称',
            type: 'string',
        },
        input11: {
            title: '代理商姓名',
            type: 'string',
        },
        input10: {
            title: '代理商电话',
            type: 'string',
            rules: [{
                len: 11,
                message: '请输入正确的手机号码格式'
            }]
        },
        input15: {
            title: '是否授权',
            type: 'string',
        },
        input16: {
            title: '授权期限',
            type: 'string',
        },
        select18: {
            title: '合作模式',
            type: 'string',
            enum: ['A', 'B', 'C', 'D'], //搜索value列表
            enumNames: ['自营', '28模式', '55模式', "低价模式"], //搜索label列表
            props: {
                allowClear: true, //支持清空
                showSearch: true, //支持搜索
                optionFilterProp: "label" //指定搜索值
            },
            widget: 'select'
        },
        input17: {
            title: '切入科室',
            type: 'string',
        },
        input18: {
            title: '重要客户联系方式',
            type: 'string',
        },
        tree1: {
            title: '负责人',
            type: 'array',
            props: {
                treeData: [
                    {
                        title: '青岛未来移动医疗科技有限公司',
                        value: '0-0',
                        key: '0-0',
                        children: [
                            {
                                title: '北京',
                                value: '0-0-0',
                                key: '0-0-0',
                                children: [
                                    {
                                        title: '魏笑',
                                        value: '0-0-0-0',
                                        key: '0-0-0-0'
                                    }
                                ]
                            },
                            {
                                title: '运营与销售管理部',
                                value: '0-0-1',
                                key: '0-0-1',
                                children: [
                                    {
                                        title: '曲婷婷',
                                        value: '0-1-0',
                                        key: '0-1-0',
                                    },
                                    {
                                        title: '魏笑',
                                        value: '0-1-1',
                                        key: '0-1-1',
                                    }
                                ],
                            },
                        ],
                    }
                ],
                multiple: true,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        tree2: {
            title: '协同人',
            type: 'array',
            items: {
                type: 'string',
            },
            props: {
                treeData,
                multiple: true,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        },
        line3: {
            title: '',
            props: {
                titles: "扩展信息",
            },
            type: 'string',
            widget: 'lines'
        },
        upload1: {
            title: '附加图片',
            type: 'string',
            widget: 'upload',
            props: {
                action: '',//上传地址
            }
        },
        upload2: {
            title: '附加文件',
            type: 'string',
            widget: 'upload',
            props: {
                action: '',//上传地址
            }
        },
        textarea1: {
            title: '备注',
            type: 'string',
            widget: 'textarea'
        },
        line2: {
            title: '',
            props: {
                titles: "系统信息",
            },
            type: 'string',
            widget: 'lines'
        },
        tree3: {
            title: '创建人',
            type: 'string',
            required: true,
            props: {
                treeData,
                treeNodeFilterProp: 'title'
            },
            widget: 'treeSelect',
        }
    },
};



const AddCustomer: React.FC = () => {
    const form = useForm();
    const children: React.ReactNode[] = []
    const [selectChildren, setselectChildren] = useState([
        {
            label: '国际部客户登记',
            value: 1
        },
        {
            label: '国内销售客户登记',
            value: 2
        },
        {
            label: '目标医院',
            value: 3
        }
    ])
    const [nowSchema, setnowSchema] = useState({})
    const [nowSelect, setnowSelect] = useState('1')
    const nav = useNavigate()
    for (let i of (selectChildren as any)) {
        children.push(<Option key={i.value}>{i.label}</Option>)
    }

    useEffect(() => {
        form.setValues({})
        switch (nowSelect) {
            case '1':
                setnowSchema(schema)
                break;
            case '2':
                setnowSchema(schema2)
                break;
            case '3':
                setnowSchema(schema3)
                break;
            default:
                break;
        }

        return () => {

        }
    }, [nowSelect])


    const onFinish = (formData: any, errors: any) => {
        console.log('formData:', formData, 'errors', errors);
    };

    return <div className='pages'>
        <div className='big_titles flex_row_sb'>
            <div className='big_names'>
                新建客户登记
            </div>
            <Space>
                <Button onClick={() => nav(-1)}>取消</Button>
                <Button type="primary" onClick={form.submit}>
                    提交
                </Button>
            </Space>
        </div>
        <div className='flex'>
            <div className='edge_box'></div>
            <div className='form_middle bac_fff'>
                <div className='flex_row w_600 mar_b20'>
                    <div className='min_titles'>
                        客户模板：
                    </div>
                    <Select className='flex1' value={nowSelect} onChange={e => setnowSelect(e)}>
                        {children}
                    </Select>
                </div>
                <div className='form_box'>
                    <FormRender widgets={{
                        lines: CostomCom,
                        Cascader: Cascader
                    }} form={form} schema={(nowSchema as any)} onFinish={onFinish} />
                </div>
            </div>
            <div className='edge_box'></div>

        </div>

    </div>
};

export default AddCustomer;