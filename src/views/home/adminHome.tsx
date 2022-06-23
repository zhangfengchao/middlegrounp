import React, { useState, useEffect } from 'react'
import { Layout, Space, Table, Button } from 'antd'
import { FilterOutlined, SettingOutlined } from '@ant-design/icons'
import TabsCom from '@/components/tablePage/TabsCom'
import type { ColumnsType, TableProps } from 'antd/lib/table';
import { TabList, OptionChildrenType, SearchComType } from '@/components/interfaceCom/InterfaceCom'
import SearchCom from '@/components/searchCom/searchCom'

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
            sortDirections: ['descend'],
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div className="table-filter-dropdown" >
                    {/* {this.itemSelection(treeData, dataIndex, selectedKeys, setSelectedKeys)} */}
                    <Space>
                        <Button
                            // onClick={() => this.handleReset(clearFilters)}
                            size="small"
                            style={{ width: 50 }}
                        >
                            清空
                        </Button>
                        <Button
                            type="primary"
                            // onClick={() => this.handleSearch(confirm)}
                            size="small"
                            style={{ width: 60 }}
                        >
                            确认
                        </Button>
                    </Space>
                </div>
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            //    filters: [
            //         {
            //             text: 'London',
            //             value: 'London',
            //         },
            //         {
            //             text: 'New York',
            //             value: 'New York',
            //         },
            //     ], 
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

    const [btnState, setbtnState] = useState<boolean>(true)

    useEffect(() => {

        return () => {

        }
    }, [])

    const setColumOperate = async () => {
        const datas = JSON.parse(JSON.stringify(data))
        datas.unshift({
            key: '-',
            name: '-',
            age: '-',
            address: '-',
        })
        setdata(datas)
        const newColums = JSON.parse(JSON.stringify(columns))
        newColums.map((column: any) => {
            column.render = (text: any, record: DataType, index: number) => {
                if (index === 0) {
                    if (column.title === 'Name') return <SearchCom {...{
                        optionChildren: searComOptions,
                        type: 1,
                        placeholder: '请选择范围',
                        completeOption: []
                    }} />
                }

                return text
            }
            return column
        })

        setcolumns(newColums)

        return
    }

    const removeColumOperate = async () => {
        const datas = JSON.parse(JSON.stringify(data))
        datas.shift()
        setdata(datas)
        const newColums = JSON.parse(JSON.stringify(columns))
        newColums.map((column: any) => {
            column.render = (text: any, record: DataType, index: number) => {
                return text
            }
            return column
        })

        setcolumns(newColums)
        return
    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === '-', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return <div className='pages'>
        <div className=''>
            <Space className='padd5 site-layout-background'>
                <div className='size16'>
                    全部客户
                </div>

                <TabsCom {...{ tabList: tabLists }} onTabChange={(e: number) => {
                    console.log(e, "阿啦啦啦")
                }} />
            </Space>
        </div>

        <Layout className='padd5'>
            <Content className='site-layout-background content'>
                <div className='padd_lr10 top_tab mar_b10'>
                    <TabsCom {...{ tabList: tabLists }} onTabChange={(e: number) => {
                        console.log(e, "阿啦啦啦")
                    }} />
                </div>

                <div className='flex'>
                    <div className='flex_wrap'>
                        <label className='switch_lable' onClick={async () => {
                            if (btnState) {
                                await setColumOperate()
                                setbtnState(false)
                            }
                            else {
                                await removeColumOperate()
                                setbtnState(true)
                            }
                        }}>
                            <span className={btnState ? 'one_switch flex_center padd_rl5' : 'two_switch flex_center padd_rl5'}>常用</span>
                            <span className={!btnState ? 'one_switch flex_center padd_rl5' : 'two_switch flex_center padd_rl5'}>高级</span>
                        </label>
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
                    <Space className='mar_r10'>
                        <FilterOutlined className='size12 grey' />

                        <SettingOutlined className='size12 grey' />
                    </Space>
                </div>

                <Table
                    scroll={{ y: 'calc(100vh - 430px)' }}
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange} />
            </Content>
        </Layout>
    </div>

}

export default AdminHome