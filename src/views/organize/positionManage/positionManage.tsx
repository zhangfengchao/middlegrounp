import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Layout, Divider, Table, Space, Button, Input, Col, Drawer, Form, Row, Select, message } from 'antd'
import type { ColumnsType } from 'antd/lib/table';
import axiosFunc from '@/axios/axios';
// import calculateColumsWidthSum from '@/utils/getW'

const { Search } = Input;
const { Option } = Select;

interface DataType {
    memberId: number; //职位ID
    memberName: string;//职位名称
    headimgUrl: string;//职位头像
    positionName: string;//职位名称
    status: number;//在职状态
    departmentName: string //所属部门名称
}

interface Position {//职位列表
    key?: number
    positionId: number
    positionName: string
}


const PositionMange: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [leaderOptions, setleaderOptions] = useState<DataType[]>([])

    const childrens: React.ReactNode[] = []

    for (let item of leaderOptions) {
        childrens.push(<Option key={item.memberId}>{item.memberName}</Option>)
    }

    const [formRefs] = Form.useForm()

    const [memberBool, setmemberBool] = useState(false)

    const [positionList, setpositionList] = useState<Position[]>([])

    const [isAdd, setisAdd] = useState(true)

    const positionId = useRef<number>()

    useEffect(() => {
        getLeaderList()
        getAllPosition()
        return () => {

        }
    }, [])// eslint-disable-line


    useMemo(() => {
        if (!memberBool) {
            positionId.current = 0
        }
    }, [memberBool])

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys)
        }
    };


    const getLeaderList = async () => {
        const res = await axiosFunc({
            url: 'getMemberList',
            method: 'GET',
            data: {
                departmentId: 0
            }
        })

        if (res && res.code === 200) setleaderOptions(res.data)
    }

    const getAllPosition = async () => {
        const res = await axiosFunc({
            url: 'getPositionList',
            method: 'GET',
            data: {}
        })

        if (res && res.code === 200) setpositionList(res.data.map((i: any) => {
            i.key = i.positionId
            return i
        }))

    }

    const columns: ColumnsType<Position> = [
        {
            title: '职位Id',
            dataIndex: 'positionId',
            key: 'positionId',
            width: 150,
        },
        {
            title: '职位',
            dataIndex: 'positionName',
            key: 'positionName',
        },
        // {
        //     title: '操作',
        //     dataIndex: 'x',
        //     key: 'x',
        //     render: (_, state: Position) => {
        //         return <div className='cursor admin_color' onClick={() => {
        //             positionId.current = state.positionId
        //             setmemberBool(true)
        //             formRefs.setFieldsValue(state)
        //             setisAdd(false)
        //         }}>编辑</div>
        //     },
        //     width: 200
        // }
    ];


    return (
        <Layout className='padd10 pages'>

            <Drawer
                width={520}
                title={<div className='titles'>{isAdd ? '新建职位' : '编辑职位'}</div>}
                placement="right"
                onClose={() => setmemberBool(false)}
                visible={memberBool}
                forceRender={true}
            >

                <Form
                    form={formRefs}
                    layout="vertical"
                    onFinish={async rows => {
                        if (positionId.current) {
                            const upRes = await axiosFunc({
                                url: 'updateMemberInfo',
                                method: "POST",
                                data: {
                                    ...rows,
                                    positionId: positionId.current
                                }
                            })

                            if (upRes.code === 200) {
                                setmemberBool(false)
                                formRefs.setFieldsValue({})
                                message.success("修改职位信息成功")
                            } else message.error(`修改职位失败:)${upRes.message}`)

                            return
                        }

                        const res = await axiosFunc({
                            url: 'addPosition',
                            method: 'POST',
                            data: rows
                        })

                        if (res && res.code === 200) {
                            await getAllPosition()
                            setmemberBool(false)
                            formRefs.setFieldsValue({})
                            message.success("创建职位成功")
                        }
                        else message.error(`创建职位失败:)${res.message}`)
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="positionName"
                                label="职位名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入职位名称'
                                    }]}
                            >
                                <Input maxLength={10} placeholder="职位名称（必填）" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} className='flex_center'>
                            <Space>
                                <Button onClick={() => setmemberBool(false)}>取消</Button>
                                <Button type={'primary'} htmlType="submit">保存</Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

            <div className='radius2 bac_fff padd10 mar_b10 size16 flex_sb'>
                <div className='titles bold'>
                    职位管理
                </div>
                <Space className='mar_r10'>
                    <Search
                        placeholder="搜索职位"
                        onSearch={async (filterContent) => { }}
                        style={{ width: 200 }} />

                    <Button type={'primary'} onClick={() => {
                        setisAdd(true)
                        setmemberBool(true)
                    }}>新建职位</Button>
                </Space>
            </div>
            <div className='page_flex'>
                <div className='flex1 bac_fff radius2  padd10'>
                    <Divider />
                    <div className='tables'>
                        <Table
                            pagination={{
                                pageSize: 20
                            }}

                            scroll={{ y: 600, x: 1000 }}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={positionList}
                            bordered
                            footer={() =>
                                <Space>
                                    <div>
                                        已选{selectedRowKeys.length}条
                                    </div>
                                    <Divider type={'vertical'} />
                                    <Button
                                        size='small'
                                        type={'primary'}
                                        disabled={selectedRowKeys.length < 1}>
                                        批量删除
                                    </Button>
                                </Space>
                            }
                        />
                    </div>
                </div>
            </div>
        </Layout >
    )

}

export default PositionMange