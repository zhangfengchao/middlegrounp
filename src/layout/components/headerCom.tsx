import React, { } from 'react'
import { Layout, Menu, Space, Dropdown, Button, Avatar, Popconfirm } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons'
const { Header } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

const HeaderCom: React.FC = () => {
    const nav = useNavigate()

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Popconfirm title="请确认是否退出？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => {
                                nav('/login', {
                                    replace: true
                                })
                            }}>
                            <Button type='text'>退出登录</Button>
                        </Popconfirm>

                    ),
                },
            ]}
        />
    );

    const menus = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Button type='text' onClick={() => {
                            nav('/login', {
                                replace: true
                            })
                        }}>审批</Button>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Button type='text' onClick={() => {
                            nav('/login', {
                                replace: true
                            })
                        }}>消息</Button>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <Button type='text' onClick={() => {
                            nav('/login', {
                                replace: true
                            })
                        }}>帮助</Button>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <Button type='text' onClick={() => {
                            nav('/login', {
                                replace: true
                            })
                        }}>管理中心</Button>
                    ),
                },
            ]}
        />
    );

    return (
        <Header className="header">
            <div className="titles" >青岛未来移动医疗科技有限公司</div>
            <Menu className='header_menu' theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            <Space className='right_box'>
                <Space className='max'>
                    <div className='mar_r20'>
                        审批
                    </div>

                    <div className='mar_r20'>
                        消息
                    </div>

                    <div className='mar_r20'>
                        帮助
                    </div>

                    <div className=''>
                        管理中心
                    </div>
                </Space>

                <Dropdown className='min' overlay={menus} placement="bottomRight" arrow>
                    <EllipsisOutlined />
                </Dropdown>

                <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Button id='Dropdown' type='text' className='fff'>
                        <Space>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            魏笑
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>

            </Space>
        </Header>
    )
}

export default HeaderCom