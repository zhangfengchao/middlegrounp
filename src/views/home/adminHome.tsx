import React, { useState, useEffect } from 'react'
import { Layout, Space, Table, Button, Input } from 'antd'
import { FilterOutlined, SettingOutlined } from '@ant-design/icons'
import TabsCom from '@/components/tablePage/TabsCom'
import type { ColumnsType, TableProps } from 'antd/lib/table';
import { TabList, OptionChildrenType, SearchComType } from '@/components/interfaceCom/InterfaceCom'
import SearchCom from '@/components/searchCom/searchCom'
import HomeModal from './components/homeModal';
import { useNavigate } from 'react-router-dom';

const { Search } = Input

const { Content } = Layout
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const AdminHome: React.FC = () => {
    const [columns, setcolumns] = useState<ColumnsType<DataType>>([
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a: any, b: any) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a: any, b: any) => a.age - b.age,

        },
    ])

    const [data, setdata] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ])

    const [tabLists] = useState<TabList[]>([
        {
            name: '国际部客户登记',
            key: 1
        },
        {
            name: '国内销售客户登记',
            key: 2
        },
        {
            name: '目标医院',
            key: 5
        }
    ])

    const [bottomTabLists] = useState<TabList[]>([
        {
            name: '全部',
            key: 1
        },
        {
            name: '7天未跟进',
            key: 2
        },
        {
            name: '今日新增',
            key: 3
        },
        {
            name: '本周新增',
            key: 4
        },
        {
            name: '即将退出公海池',
            key: 5
        },
        {
            name: '我负责的',
            key: 6
        },
        {
            name: '我协同的',
            key: 7
        },
        {
            name: '下属负责的',
            key: 8
        },
        {
            name: '下属协同的',
            key: 9
        }

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

    const [searchComLists] = useState<SearchComType[]>([
        {
            optionChildren: searComOptions,
            type: 1,
            placeholder: '请选择范围',
            completeOption: []
        },
        {
            optionChildren: searComOptions,
            type: 3,
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
        }
    ])

    const [btnState, setbtnState] = useState<boolean>(true)

    const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([])

    const [isHomeModal, setisHomeModal] = useState(false)


    const nav = useNavigate()

    useEffect(() => {
        return () => {
            // timer = 0
        }
    }, [])


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setselectedRowKeys(newSelectedRowKeys)
        }
    };

    return <div className='pages'>
        <HomeModal {
            ...{
                isModalVisible: isHomeModal
            }
        } onClose={() => setisHomeModal(false)} />
        <div className='padd5 site-layout-background flex_row_sb'>
            <Space className='mar_l10'>
                <div className='size16'>
                    全部客户
                </div>

                <div className='top_tabs'>
                    <TabsCom {...{ tabList: tabLists }} onTabChange={(e: number) => {
                        console.log(e, "阿啦啦啦")
                    }} />
                </div>
            </Space>

            <Space className='mar_r10'>
                <div className='mar_r10'>
                    <Search placeholder='客户名称或者客户电话搜索' onSearch={(e: any) => console.log(e)} />
                </div>
                <Button type={'primary'} className='mar_r10' onClick={() => nav('/addCustomer')}>
                    新建
                </Button>

                <Button className='mar_r10' onClick={() => nav('/cnki')}>
                    查重
                </Button>

            </Space>
        </div>

        <Layout className='padd5'>
            <Content className='site-layout-background content'>
                <div className='border_b flex_row_sb'>
                    <div className='top_tab '>
                        <TabsCom {...{ tabList: bottomTabLists }} onTabChange={(e: number) => {
                            console.log(e, "阿啦啦啦")
                        }} />
                    </div>

                    <div className='mar_r20 cursor size16' onClick={() => setisHomeModal(true)}>
                        分组管理
                    </div>
                </div>

                <div className='sb border_b'>
                    <div className='flex padd_tb10'>
                        <label className={btnState ? 'switch_lable' : 'switch_lable'} onClick={async () => {
                            if (btnState) {
                                // await setColumOperate()
                                setbtnState(false)
                            }
                            else {
                                // await removeColumOperate()
                                setbtnState(true)
                            }
                        }}>
                            <span className={btnState ? 'one_switch flex_center padd_rl5' : 'two_switch flex_center padd_rl5'}>常用</span>
                            <span className={!btnState ? 'one_switch flex_center padd_rl5' : 'two_switch flex_center padd_rl5'}>高级</span>
                        </label>
                        <div className='flex_wrap'>
                            {
                                btnState ? searchComList.map((i: SearchComType, k: number) =>
                                    <div key={k} className='padd_lr10 padd_b10'>
                                        <SearchCom
                                            {
                                            ...i
                                            } />
                                    </div>
                                ) : <></>
                            }
                        </div>
                    </div>
                    <div className='inline_flex'>
                        <FilterOutlined className='size16 grey mar_r10' />

                        <SettingOutlined className='size16 grey' />
                    </div>
                </div>

                <Table
                    sticky
                    scroll={{ y: 'calc(100vh - 390px)' }}
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    summary={() => (
                        <Table.Summary >
                            {
                                !btnState ? <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} key="123"></Table.Summary.Cell>
                                    {
                                        searchComLists.map((i: SearchComType, k: number) =>
                                            <Table.Summary.Cell index={k + 1} key={k}>
                                                <SearchCom
                                                    {
                                                    ...i
                                                    } />
                                            </Table.Summary.Cell>
                                        )
                                    }
                                </Table.Summary.Row> : <></>
                            }

                        </Table.Summary>
                    )}

                    footer={() => <Space>
                        当前已选{selectedRowKeys.length}条
                    </Space>
                    }
                />
            </Content>
        </Layout>
    </div>

}

export default AdminHome