import { Layout, Skeleton, Divider } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import HeaderCom from './components/headerCom';
import MenuCom from './components/menuCom';
import router from '../router'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from '@ant-design/icons'
const { Content, Sider } = Layout;

const Layouts: React.FC = () => {
    const [isLayout, setisLayout] = useState(true)
    const location = useLocation()
    const [collapsedBool, setcollapsedBool] = useState(false)
    const [siderState, setsiderState] = useState(false)
    useEffect(() => {
        router.forEach(item => {
            if (item.path === location.pathname) setisLayout(item.isLayout ? true : false)
        })

        return () => {

        }
    }, [location])

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
                            <MenuCom />
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