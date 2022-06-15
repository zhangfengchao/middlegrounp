import React, { } from 'react'
import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import Generator from 'fr-generator';


const NewWidget = (value = 0) => (
    <button >{value}</button>
);

const EditerForm: React.FC = () => {
    const nav = useNavigate()

    return <div className='flex_box pages'>
        <PageHeader
            className="site-page-header"
            onBack={() => nav(-1)}
            title="Title"
        />
        <div className='flex1'>
            <Generator widgets={{ NewWidget }}
                settings={[
                    {
                        title: '个人信息',
                        widgets: [
                            {
                                text: '姓名',
                                name: 'name',
                                schema: {
                                    title: '输入框',
                                    type: 'string',
                                },
                                setting: {
                                    $id: {
                                        title: 'ID',
                                        description: '字段名称/英文',
                                        type: 'string',
                                        widget: 'idInput',
                                        require: true,
                                        rules: [
                                            {
                                                pattern: '^#/.+$',
                                                message: 'ID 必填',
                                            },
                                        ],
                                    },
                                    maxLength: { title: '最长字数', type: 'number' },
                                    title: {
                                        title: '标题',
                                        type: 'string',
                                        widget: 'htmlInput',
                                    },
                                    displayType: {
                                        title: '标题展示模式',
                                        type: 'string',
                                        enum: ['row', 'column'],
                                        enumNames: ['同行', '单独一行'],
                                        widget: 'radio',
                                    },
                                    description: {
                                        title: '说明',
                                        type: 'string',
                                    },
                                    default: {
                                        title: '默认值',
                                        type: 'string',
                                    },
                                    required: {
                                        title: '必填',
                                        type: 'boolean',
                                    },
                                    placeholder: {
                                        title: '占位符',
                                        type: 'string',
                                    },
                                    bind: {
                                        title: 'Bind',
                                        type: 'string',
                                    },
                                    min: {
                                        title: '最小值',
                                        type: 'number',
                                    },
                                    max: {
                                        title: '最大值',
                                        type: 'number',
                                    },
                                    disabled: {
                                        title: '禁用',
                                        type: 'boolean',
                                    },
                                },
                            },
                            {
                                text: '下拉单选',
                                name: 'select',
                                schema: {
                                    title: '单选',
                                    type: 'string',
                                    enum: ['a', 'b', 'c'],
                                    enumNames: ['早', '中', '晚'],
                                    widget: 'select',
                                },
                                setting: {
                                    enumList: {
                                        title: '选项',
                                        type: 'array',
                                        widget: 'simpleList',
                                        className: 'frg-options-list',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                value: {
                                                    title: '',
                                                    type: 'string',
                                                    className: 'frg-options-input',
                                                    props: {},
                                                    placeholder: '字段',
                                                },
                                                label: {
                                                    title: '',
                                                    type: 'string',
                                                    className: 'frg-options-input',
                                                    props: {},
                                                    placeholder: '名称',
                                                },
                                            },
                                        },
                                        props: {
                                            hideMove: true,
                                            hideCopy: true,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ]}
                commonSettings={{
                    description: {
                        title: '自定义共通用的入参',
                        type: 'string',
                    },
                }}
            />
        </div>
    </div>

}

export default EditerForm


