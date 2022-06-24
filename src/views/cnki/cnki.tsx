import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Input, Table, Space, message } from 'antd'
import type { ColumnsType } from 'antd/lib/table';


interface DataType {
    key: string;
    name: string;
    money: string;
    address: string;
}

interface TagInter {
    name: string;
    key: number;
    selected: boolean
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Cash Assets',
        dataIndex: 'money',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
];
const { Search } = Input

const Cnki: React.FC = () => {
    const [btnState, setbtnState] = useState(false)
    const [isSearch, setisSearch] = useState(false)
    const [tagList, settagList] = useState<TagInter[]>([
        {
            name: '国际部客户登记',
            key: 1,
            selected: true
        },
        {
            name: '国内销售客户登记',
            key: 2,
            selected: false
        },
        {
            name: '企业客户',
            key: 3,
            selected: false
        },
        {
            name: '药企合作',
            key: 4,
            selected: false
        },
        {
            name: '医院档案信息',
            key: 5,
            selected: false
        },
        {
            name: '目标医院',
            key: 6,
            selected: false
        },
    ])
    const nav = useNavigate()

    return (
        <div className='pages'>
            <div className='big_titles flex_row_sb'>
                <div className='big_names'>
                    客户查重
                </div>
                <CloseOutlined className='size22 grey' onClick={() => nav(-1)} />
            </div>

            <div className='flex1 bac_fff'>
                <div className='dialog_box posr flex_center'>
                    <label className={btnState ? 'switch_lable dialog_switch' : 'switch_lable dialog_switch'} onClick={async () => {
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

                    <div className='big_search'>
                        <Search placeholder='输入客户名称或客户电话(查询)' size={'large'} onSearch={(e: any) => {
                            if (!e) {
                                message.error("请输入搜索条件后再试 :(")
                                return
                            }
                            setisSearch(true)
                        }}></Search>
                    </div>
                </div>
                {
                    isSearch ? <div className='min_table_box'>
                        <div className='bold size16 mar_b10'>
                            重复客户管理
                        </div>
                        <Space className='mar_b10'>
                            {
                                tagList.map((i: TagInter, k: number) =>
                                    <div
                                        onClick={() => {
                                            if (i.selected) return
                                            else {
                                                const tags = JSON.parse(JSON.stringify(tagList))
                                                settagList(tags.map((item: TagInter) => {
                                                    if (i.key === item.key) item.selected = true
                                                    else item.selected = false
                                                    return item
                                                }))
                                            }
                                        }}
                                        key={k}
                                        className={i.selected ? 'selected mar_r10 cursor' : 'not_selected mar_r10 cursor'}
                                    >
                                        {i.name}
                                    </div>
                                )
                            }
                        </Space>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            title={() => 'Header'}
                            footer={() => 'Footer'}
                        />
                    </div> : <div className='flex1 flex_center grey size18 middle_h'>
                        默认心事10条重复数据，内容越详细，越有利于查重
                    </div>
                }

            </div>
        </div>
    )

}

export default Cnki