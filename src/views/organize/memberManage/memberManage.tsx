import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Layout, Divider, Table, Space, Button, Input, Tree, Col, Drawer, Form, Row, Select, TreeSelect, Dropdown, Menu, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/lib/table';
import { UsergroupAddOutlined, MoreOutlined } from '@ant-design/icons'
import axiosFunc from '@/axios/axios';
// import calculateColumsWidthSum from '@/utils/getW'

const { Search } = Input;
const { Option } = Select;

interface DataType {
    bind_wx: boolean; //true已绑定微信,false未绑定微信
    memberId: number; //成员ID
    memberName: string;//成员名称
    headimgUrl: string;//成员头像
    positionName: string;//职位名称
    status: number;//在职状态
    departmentName: string //所属部门名称
}

interface TreeData {//服务端返回tree结构
    title: any
    id: number
    children?: any[]
    key: number
}
interface TreeDatas {//本地tree结构
    title: string
    value: number
    children?: any[]
    key: number
}

interface ImportListType {//可导入列表
    memberId: number,
    key: number,
    memberName: string
}

interface Position {//职位列表
    positionId: number
    positionName: string
}


const MemberManage: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [tableData, settableData] = useState<DataType[]>([])

    const [departmentId, setdepartmentId] = useState<number>(0)

    const [memerName, setmemerName] = useState<string>('')

    const [visible, setVisible] = useState(false);

    const [datas, setdatas] = useState<TreeDatas[]>([])

    const [dataList, setdataList] = useState<TreeDatas[]>([])

    const [leaderOptions, setleaderOptions] = useState<DataType[]>([])

    const childrens: React.ReactNode[] = []

    for (let item of leaderOptions) {
        childrens.push(<Option key={item.memberId}>{item.memberName}</Option>)
    }

    const [formRef] = Form.useForm()

    const moveId = useRef<number>()

    const [isPosition, setisPosition] = useState(true)

    const [importFunc, setimportFunc] = useState(false)

    const [importList, setimportList] = useState<ImportListType[]>()

    const importColumns: ColumnsType<ImportListType> = [
        {
            title: '姓名',
            dataIndex: 'memberName',
            key: 'memberName',
            width: '20%',
        },
        {
            title: '头像',
            dataIndex: 'headimgUrl',
            key: 'headimgUrl',
            render: (row: string) => <img className='hear_img' src={row} alt="not headimg" />
        },
    ]

    const [importRows, setimportRows] = useState<React.Key[]>([])

    const [formRefs] = Form.useForm()

    const [memberBool, setmemberBool] = useState(false)

    const [positionList, setpositionList] = useState<Position[]>([])

    const childrenPosition: React.ReactNode[] = []

    for (let item of positionList) {
        childrenPosition.push(<Option key={item.positionId}>{item.positionName}</Option>)
    }

    const memberIds = useRef<number>(0)

    const [isAdd, setisAdd] = useState(true)

    const [selectedKeys, setselectedKeys] = useState<string[]>()


    useEffect(() => {
        getTreeData()
        getLeaderList()
        getAllPosition()
        return () => {

        }
    }, [])// eslint-disable-line

    useEffect(() => {

        getMemberUser()
        return () => {

        }
    }, [departmentId])// eslint-disable-line

    useMemo(() => {
        if (!visible) moveId.current = 0
    }, [visible])

    useMemo(() => {
        if (!memberBool) {
            memberIds.current = 0
        }
    }, [memberBool])

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys)
        }
    };

    const rowSelections = {
        selectedRowKeys: importRows,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setimportRows(newSelectedRowKeys)
        }
    };


    const getTreeData = async () => {
        let res = await axiosFunc({
            url: 'getDepartmentTree',
            method: 'GET',
            data: {}
        })

        if (res && res.code === 200) {
            setdatas(await handleTreeData(res.data, false))
            setdataList(await handleTreeData(res.data, true))
            setmemerName(`${res.data[0].title}部门`)
        }
    }

    const getDepartmentDetailFunc = async () => {
        const res = await axiosFunc({
            url: 'getDepartmentDetail',
            method: 'GET',
            data: {
                departmentId: moveId.current
            }
        })

        if (res.code === 200) formRef.setFieldsValue({
            ...res.data,
            leaderId: String(res.data.leaderId)
        })
    }

    const getImportMemberList = async () => {
        const res = await axiosFunc({
            url: 'getSelectableMemberList',
            method: 'GET',
            data: {
                departmentId
            }
        })

        if (res.code === 200) {
            setimportList(res.data.map((i: any) => {
                i.key = i.memberId
                return i
            }))
        }
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <Popconfirm
                        title="请确认是否删除该部门下的所有部门?"
                        onConfirm={async () => {
                            if (!moveId.current) {
                                message.info("系統錯誤:)")
                                return
                            }
                            const res = await axiosFunc({
                                url: 'deleteDepartment',
                                method: "POST",
                                data: {
                                    departmentId: moveId.current
                                }
                            })

                            if (res.code === 200) {
                                getTreeData()
                                message.success("已成功为您删除该部门~")
                            } else message.error(`删除失败${res.message}`)
                        }}
                        okText="是"
                        cancelText="否"
                    >
                        <div className='cursor'>删除部门</div>
                    </Popconfirm>
                },
                {
                    key: '2',
                    label: <div className='cursor' onClick={async () => {
                        await getDepartmentDetailFunc()
                        setVisible(true)
                    }}>编辑部门</div>
                }
            ]}
        />
    );


    const handleTreeData = (datas: TreeData[], bool: boolean) => {
        let nodeData: any = [];
        datas.forEach((item: TreeData) => {
            let treeObj: any = {
                title: '',
                value: '',
                key: 0,
                children: []
            }

            bool ? treeObj.title = <div className='flex_sb'>
                {item.title}
                <div className='title_posa' onMouseOut={() => {
                    moveId.current = item.id
                    setisPosition(false)
                }}>
                    {
                        item.id ? <Dropdown overlay={menu}>
                            <MoreOutlined />
                        </Dropdown> : <></>
                    }

                </div>
            </div> : treeObj.title = item.title
            treeObj.value = item.id;
            treeObj.key = item.key;
            if (item.children) treeObj.children = handleTreeData(item.children, bool)
            nodeData.push(treeObj);
        })
        return nodeData
    }


    const getMemberUser = async () => {
        let res = await axiosFunc({
            url: 'getMemberList',
            method: 'GET',
            data: {
                departmentId
            }
        })

        if (res.code === 200) settableData(res.data.map((i: any) => {
            i.key = i.memberId
            return i
        }))
    }

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

        if (res && res.code === 200) setpositionList(res.data)

    }

    const importMember = async () => {
        const res = await axiosFunc({
            url: 'departmentAddMember',
            method: 'POST',
            data: {
                members: importRows,
                departmentId
            }
        })

        setimportFunc(false)

        if (res.code === 200) {
            message.success("导入成功！")
            setimportRows([])
            getMemberUser()
        } else message.error(`导入成员失败${res.message}`)
    }

    const removeMembers = async () => {
        const res = await axiosFunc({
            url: 'departmentRemoveMember',
            method: 'POST',
            data: {
                departmentId,
                members: selectedRowKeys
            }
        })
        if (res.code === 200) {
            message.success("移除成功！")
            setSelectedRowKeys([])
            getMemberUser()
        } else message.error(`移除成员失败${res.message}`)
    }

    const getMemberDetail = async () => {
        const res = await axiosFunc({
            url: 'getMemberInfo',
            method: 'GET',
            data: {
                memberId: memberIds.current
            }
        })

        if (res && res.code === 200) formRefs.setFieldsValue({
            ...res.data,
            positionId: String(res.data.positionId)
        })
        else message.error(`获取详情错误${res.message}`)
    }

    const memberResignFunc = async (memberId: number) => {
        const res = await axiosFunc({
            url: 'memberResign',
            method: 'POST',
            data: { memberId }
        })

        if (res && res.code === 200) {
            getMemberUser()
            message.success("操作成功！")
        }
        else message.error(`操作失败${res.message}`)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '姓名',
            dataIndex: 'memberName',
            key: 'memberName',
            width: 100,
        },
        {
            title: '头像',
            dataIndex: 'headimgUrl',
            key: 'headimgUrl',
            width: 100,
            render: (row: string) => <img className='hear_img' src={row} alt="not headimg" />
        },
        {
            title: '职位',
            dataIndex: 'positionName',
            key: 'positionName',
            width: 100
        },
        {
            title: '所属部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
            width: 200
        },
        {
            title: '是否在职',
            dataIndex: 'status',
            key: 'status',
            render: (row: number) => row === 1 ? "在职" : "已离职",
            width: 100
        },
        {
            title: '是否绑定微信',
            dataIndex: 'bind_wx',
            key: 'bind_wx',
            render: (row: number) => row ? "已绑定" : "未绑定",
            width: 120
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            fixed: 'right',
            width: 280,
            render: (_, state: DataType) => <Space>
                <div
                    className='admin_color cursor'
                    onClick={async () => {
                        memberIds.current = state.memberId
                        await getMemberDetail()
                        setmemberBool(true)
                        setisAdd(false)
                    }}>
                    编辑成员
                </div>

                {
                    state.status === 1 ? <Popconfirm
                        title="请确认当前员工是否已离职?"
                        onConfirm={() => memberResignFunc(state.memberId)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button
                            type='text'
                            size='small'
                            className='admin_color cursor'
                        >
                            员工离职
                        </Button>
                    </Popconfirm> : <></>
                }

                {
                    state.bind_wx ? <Popconfirm
                        title="请确认当前员工是否已离职?"
                        onConfirm={() => memberResignFunc(state.memberId)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button
                            type='text'
                            size='small'
                            className='admin_color cursor'
                        >
                            解绑微信绑定
                        </Button>
                    </Popconfirm> : <></>
                }


            </Space>,
        },
    ];

    const searchMemberFunc = async (filterContent: any) => {
        let res = await axiosFunc({
            url: 'getMemberList',
            method: 'GET',
            data: {
                departmentId,
                filterContent
            }
        })

        if (res.code === 200) settableData(res.data.map((i: any) => {
            i.key = i.memberId
            return i
        }))
    }

    return (
        <Layout className='padd10 pages'>
            <Drawer
                width={520}
                title={<div className='titles'>{isPosition ? '新建部门' : '编辑部门'}</div>}
                placement="right"
                onClose={() => setVisible(false)}
                visible={visible}
                forceRender={true}
            >

                <Form
                    form={formRef}
                    layout="vertical"
                    onFinish={async rows => {
                        if (moveId.current) {
                            const upRes = await axiosFunc({
                                url: 'updateDepartmentInfo',
                                method: "POST",
                                data: {
                                    ...rows,
                                    departmentId: moveId.current ? moveId.current : null
                                }
                            })

                            if (upRes.code === 200) {
                                getTreeData()
                                setVisible(false)
                                formRef.setFieldsValue({})
                                message.success("修改部门信息成功")
                            } else message.error(`修改部门失败:)${upRes.message}`)

                            return
                        }

                        const res = await axiosFunc({
                            url: 'addDepartment',
                            method: 'POST',
                            data: {
                                ...rows,
                            }
                        })

                        if (res && res.code === 200) {
                            getTreeData()
                            setVisible(false)
                            formRef.setFieldsValue({})
                            message.success("创建部门成功")
                        }
                        else message.error(`创建部门失败:)${res.message}`)
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="departmentName"
                                label="部门名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入部门名称'
                                    }]}
                            >
                                <Input maxLength={10} showCount placeholder="部门名称（必填）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="parentDepartmentId"
                                label="上级部门"
                                rules={[{ required: true, message: '请选择上级部门！' }]}
                            >
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="请选择上级部门（必填）"
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={(e, a) => console.log(e, a)}
                                    treeData={datas}
                                >
                                </TreeSelect>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="leaderId"
                                label="部门领导"
                                rules={[{ required: true, message: '请选择部门领导' }]}
                            >
                                <Select placeholder="请选择部门领导（必填）">
                                    {childrens}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className='flex_center'>
                            <Space>
                                <Button onClick={() => setVisible(false)}>取消</Button>
                                <Button type={'primary'} htmlType="submit">保存</Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

            <Drawer
                width={620}
                title={<div className='titles'>批量导入当前部门：（{memerName}）</div>}
                placement="right"
                onClose={() => setimportFunc(false)}
                visible={importFunc}
                forceRender={true}
            >
                <Table
                    pagination={{
                        pageSize: 20
                    }}

                    scroll={{ y: 680 }}
                    rowSelection={rowSelections}
                    columns={importColumns}
                    dataSource={importList}
                    bordered
                    footer={() =>
                        <Space>
                            <Button onClick={() => {
                                setimportRows([])
                                setimportFunc(false)
                            }}>取消导入</Button>

                            <Button
                                type={'primary'}

                                disabled={importRows.length < 1}
                                onClick={() => importMember()}>
                                导入选中成员
                            </Button>
                        </Space>
                    }
                />

            </Drawer>

            <Drawer
                width={520}
                title={<div className='titles'>{isAdd ? '新建成员' : '编辑成员'}</div>}
                placement="right"
                onClose={() => setmemberBool(false)}
                visible={memberBool}
                forceRender={true}
            >

                <Form
                    form={formRefs}
                    layout="vertical"
                    onFinish={async rows => {
                        if (memberIds.current) {
                            const upRes = await axiosFunc({
                                url: 'updateMemberInfo',
                                method: "POST",
                                data: {
                                    ...rows,
                                    memberId: memberIds.current
                                }
                            })

                            if (upRes.code === 200) {
                                getMemberUser()
                                setmemberBool(false)
                                formRefs.setFieldsValue({})
                                message.success("修改成员信息成功")
                            } else message.error(`修改成员失败:)${upRes.message}`)

                            return
                        }

                        const res = await axiosFunc({
                            url: 'addMember',
                            method: 'POST',
                            data: rows
                        })

                        if (res && res.code === 200) {
                            getMemberUser()
                            setmemberBool(false)
                            formRefs.setFieldsValue({})
                            message.success("创建成员成功")
                        }
                        else message.error(`创建成员失败:)${res.message}`)
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="memberName"
                                label="成员名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入成员名称'
                                    }]}
                            >
                                <Input maxLength={10} placeholder="成员名称（必填）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="phoneNumber"
                                label="手机号码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号码！'
                                    },
                                    {
                                        len: 11,
                                        message: '请输入11位手机号：）'
                                    }
                                ]
                                }
                            >
                                <Input maxLength={11} showCount placeholder="手机号码（必填）" />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="邮箱"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入邮箱'
                                    },
                                    {
                                        type: 'email',
                                        message: '请输入正确的邮箱格式'
                                    }
                                ]}
                            >
                                <Input maxLength={30} placeholder="邮箱（必填）" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="positionId"
                                label="职位"
                                rules={[{ required: true, message: '请选择职位' }]}
                            >
                                <Select placeholder="请选择职位（必填）">
                                    {childrenPosition}
                                </Select>
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
                    成员管理
                </div>

                <Space className='mar_r10'>
                    <Search
                        className='mar_r10'
                        placeholder="搜索成员/职位"
                        onSearch={async (filterContent) => await searchMemberFunc(filterContent)}
                        style={{ width: 200 }} />

                    <Search
                        className='mar_r10'
                        placeholder="搜索手机号/邮箱"
                        onSearch={async (filterContent) => await searchMemberFunc(filterContent)}
                        style={{ width: 200 }} />

                    <Button type={'primary'} onClick={() => {
                        setisAdd(true)
                        setmemberBool(true)
                    }}>新建成员</Button>
                </Space>
            </div>
            <div className='page_flex'>
                <div className='radius2 page_left bac_fff padd10 posr flex_c_sb'>
                    <div>
                        <div className='flex_center'>
                            <Search placeholder="搜索部门" onSearch={async (filterContent: any) => {
                                let res = await axiosFunc({
                                    url: 'getDepartmentTree',
                                    method: 'GET',
                                    data: { filterContent }
                                })

                                if (res && res.code === 200) {
                                    setdatas(await handleTreeData(res.data, false))
                                    setdataList(await handleTreeData(res.data, true))
                                    setmemerName(`${res.data[0].title}部门`)
                                }
                            }} style={{ width: 200 }} />
                        </div>

                        <Divider />

                        <Tree
                            selectedKeys={selectedKeys}
                            showLine={true}
                            onSelect={(e, a) => {
                                if (!e.length) return
                                setselectedKeys((e as string[]))
                                setmemerName(`${(a.node as any).title.props.children[0]}部门`)
                                setdepartmentId((e[0] as number))
                            }}
                            treeData={dataList}
                        />
                    </div>

                    <div className='flex_center box_bottom'>
                        <Button onClick={() => {
                            setisPosition(true)
                            setVisible(true)
                        }}>
                            <Space>
                                <UsergroupAddOutlined />
                                新建部门
                            </Space>
                        </Button>
                    </div>
                </div>
                <div className='flex1 bac_fff radius2 mar_l10 padd10 over'>
                    <div className='titles mar_b10 flex_sb'>
                        {memerName}

                        {
                            departmentId ? <Button type={'primary'} onClick={async () => {
                                await getImportMemberList()
                                setimportFunc(true)
                            }}>
                                批量导入
                            </Button> : <></>
                        }

                    </div>
                    <Divider />
                    <div className='tables'>
                        <Table
                            pagination={{
                                pageSize: 20
                            }}

                            scroll={{ y: 'calc(100vh - 380px)' }}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tableData}
                            bordered
                            footer={() =>
                                <>{
                                    departmentId ? <Space>
                                        <div>
                                            已选{selectedRowKeys.length}条
                                        </div>
                                        <Button
                                            size='small'
                                            onClick={async () => await removeMembers()}
                                            type={'primary'}

                                            disabled={selectedRowKeys.length < 1}>
                                            批量移除
                                        </Button>
                                    </Space> : <></>
                                }</>
                            }
                        />
                    </div>
                </div>
            </div>
        </Layout >
    )

}

export default MemberManage