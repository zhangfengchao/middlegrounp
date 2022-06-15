import React, { useState } from 'react'
import { Layout, Space } from 'antd'
import { FilterOutlined, SettingOutlined } from '@ant-design/icons'
import TabsCom from '../../components/tablePage/TabsCom'
import { TabList, OptionChildrenType, SearchComType } from '../../components/interfaceCom/InterfaceCom'
import SearchCom from '../../components/searchCom/searchCom'

const { Content } = Layout

const AdminHome: React.FC = () => {

    const [tabLists] = useState<TabList[]>([
        {
            name: '啦啦啦',
            key: 1
        },
        {
            name: '啦啦啦',
            key: 2
        },
        {
            name: '啦啦啦',
            key: 3
        },
        {
            name: '啦啦啦',
            key: 4
        },
        {
            name: '啦啦啦',
            key: 5
        },
        {
            name: '啦啦啦',
            key: 6
        },
    ])

    const [searComOptions] = useState<OptionChildrenType[]>([
        {
            value: '==',
            label: '=='
        },
        {
            value: '<=',
            label: '<='
        },
        {
            value: '>=',
            label: '>='
        },
        {
            value: '!=',
            label: '!='
        }
    ])

    const [searchComList] = useState<SearchComType[]>([
        {
            optionChildren: searComOptions,
            type: 1,
            label: '范围筛选',
            placeholder: '请选择范围',
            completeOption: []
        },
        {
            optionChildren: searComOptions,
            type: 3,
            label: '客户名称',
            placeholder: '请选择或输入',
            completeOption: [
                {
                    key: 1,
                    value: '张三'
                },
                {
                    key: 2,
                    value: '李四'
                },
                {
                    key: 3,
                    value: '王五'
                }
            ]
        },
        {
            optionChildren: searComOptions,
            type: 4,
            label: '推荐渠道',
            placeholder: '请选择',
            completeOption: [{
                label: '张三',
                value: 1
            },
            {
                label: '李四',
                value: 2
            },
            {
                label: '王五',
                value: 3
            }]
        },
        {
            optionChildren: searComOptions,
            type: 1,
            label: '预计金额',
            placeholder: '请输入内容',
            completeOption: []
        },
        {
            optionChildren: searComOptions,
            type: 2,
            label: '首次拜访日期',
            placeholder: '选择日期',
            completeOption: []
        },
        {
            optionChildren: searComOptions,
            type: 2,
            label: '创建时间',
            placeholder: '选择日期',
            completeOption: []
        },
        {
            optionChildren: searComOptions,
            type: 2,
            label: '最后跟进时间',
            placeholder: '选择日期',
            completeOption: []
        }
    ])

    return <div className='pages'>
        <Space className='padd5 site-layout-background'>
            <div className='size12'>
                全部客户
            </div>

            <TabsCom {...{ tabList: tabLists }} onTabChange={(e: number) => {
                console.log(e, "阿啦啦啦")
            }} />
        </Space>

        <Layout className='padd5'>
            <Content className='site-layout-background content'>
                <div className='padd_lr10 top_tab mar_b10'>
                    <TabsCom {...{ tabList: tabLists }} onTabChange={(e: number) => {
                        console.log(e, "阿啦啦啦")
                    }} />
                </div>

                <div className='flex'>
                    <div className='flex_wrap'>
                        {
                            searchComList.map((i: SearchComType, k: number) =>
                                <div key={k} className='padd_lr10 padd_b10'>
                                    <SearchCom
                                        {
                                        ...i
                                        } />
                                </div>
                            )
                        }
                    </div>
                    <Space className='mar_r10'>
                        <FilterOutlined className='size12 grey' />

                        <SettingOutlined className='size12 grey' />
                    </Space>
                </div>
            </Content>
        </Layout>
    </div>

}

export default AdminHome