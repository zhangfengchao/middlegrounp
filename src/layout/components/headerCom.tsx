import React, { useEffect } from 'react'
import { Layout, Menu, Space, Dropdown, Button, Avatar, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { menuTypeAction } from '@/redux/count_action_creator';

const { Header } = Layout;


// const items2: MenuProps['items'] = ["审批", "消息", '帮助', "管理中心"].map((i, k) => ({
//     key: k,
//     label: i,
// }));

const HeaderCom: React.FC = () => {
    const store = useSelector((state: any) => state.middlegrounp.userInfo)
    const nav = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(store)

        return () => {

        }
    }, [store])


    const menu = (
        <Menu
            items={[
                {
                    key: '0',
                    label: (
                        <Popconfirm title="请确认是否退出？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => {
                                nav('/login', {
                                    replace: true,
                                    state: {}
                                })
                            }}>
                            <Button type='text'>退出登录</Button>
                        </Popconfirm>

                    ),
                },
            ]}
        />
    );


    return (
        <Header className="header">
            <div className="titles size14" >青岛未来移动医疗科技有限公司</div>
            <div className='header_menu cursor size18' onClick={() => {
                dispatch(menuTypeAction({
                    menuType: 1
                }))
            }} >首页</div>
            <Space className='right_box'>
                <Space className='max size20 size16'>
                    <div className='mar_r20 cursor'>
                        审批
                    </div>

                    <div className='mar_r20 cursor'>
                        消息
                    </div>

                    <div className='mar_r20 cursor'>
                        帮助
                    </div>

                    <div className='cursor' onClick={() => {
                        dispatch(menuTypeAction({
                            menuType: 2
                        }))
                    }}>
                        管理中心
                    </div>
                </Space>

                <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Button id='Dropdown' type='text' className='fff'>
                        <Space className='fff'>
                            <Avatar style={{ backgroundColor: '#87d068' }} src={store.headimgurl} icon={<UserOutlined />} />
                            {store.memberName}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>

            </Space>
        </Header>
    )
}

export default HeaderCom