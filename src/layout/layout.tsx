import { Layout, Skeleton, Divider } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import HeaderCom from './components/headerCom';
import MenuCom from './components/menuCom';
import router from '../router'
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import axiosFunc from '@/axios/axios'
interface MenuComs {
    icon?: string
    id: number
    key: string
    children?: any[]
}

const { Content, Sider } = Layout;

const Layouts: React.FC = () => {
    const nav = useNavigate()
    const type = useSelector((state: any) => state.middlegrounp.menuType)
    const [selectedKeys, setselectedKeys] = useState('/')
    const userInfo = useSelector((state: any) => state.middlegrounp.userInfo)
    const [menuList, setmenuList] = useState<MenuComs[]>([])
    const [isLayout, setisLayout] = useState(true)
    const location = useLocation()
    const [collapsedBool, setcollapsedBool] = useState(false)
    const [siderState, setsiderState] = useState(false)
    useEffect(() => {
        if (Object.keys(userInfo).length < 1) {
            nav('login', {
                replace: true,
                state: {
                    message: '系统错误'
                }
            })
        }
        router.forEach(item => {
            if (item.path === location.pathname) setisLayout(item.isLayout ? true : false)
        })
        return () => {

        }
    }, [location, userInfo, nav])

    useEffect(() => {
        getAllMenu()

        return () => {

        }
    }, [type])// eslint-disable-line


    const getAllMenu = async () => {
        let res = await axiosFunc({
            url: 'getUsableFunctions',
            method: 'GET',
            data: {
                type
            }
        })

        if (res.code === 200) {
            setmenuList(res.data)
            setselectedKeys((res as any).defaultFunction)
            nav((res as any).defaultFunction, {
                replace: true
            })
        }
    }

    return (
        <Layout className='layout'>

            {
                isLayout ? <HeaderCom /> : <></>
            }
            <Layout>
                {
                    isLayout ? <Sider
                        defaultCollapsed={true}
                        collapsed={collapsedBool}
                        trigger={null}
                        width={160}
                        className="site-layout-background posr"
                        onMouseEnter={() => {
                            if (siderState) return
                            setcollapsedBool(false)
                        }}
                        onMouseLeave={() => {
                            if (siderState) return
                            setcollapsedBool(true)
                        }}
                    >
                        <div className='menucom_box'>
                            <MenuCom {...{ menuList, selectedKeys }} onMenuClick={(e: any) => {
                                setselectedKeys(e.key)
                                nav(e.key)
                            }} />
                        </div>
                        <div className='padd10 flex_center bottom'>
                            <SettingOutlined className='size16' />

                            <Divider type={'vertical'} />

                            {React.createElement(siderState ? MenuFoldOutlined : MenuUnfoldOutlined, {
                                className: 'size16',
                                onClick: () => {
                                    if (!collapsedBool) setcollapsedBool(false)
                                    setsiderState(!siderState)
                                }
                            })}
                        </div>
                    </Sider> : <></>
                }

                <Content className="content">
                    <Routes>
                        <Route path="*" element={<Navigate to="adminHome" replace={true} />}></Route>
                        {
                            router.map((item, i) =>
                                <Route key={i} path={item.path} element={
                                    <Suspense fallback={
                                        <Skeleton active />
                                    }>
                                        < item.component />
                                    </Suspense>
                                } />
                            )
                        }
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Layouts;