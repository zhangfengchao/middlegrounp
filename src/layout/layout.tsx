import { Layout } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import HeaderCom from './components/headerCom';
import MenuCom from './components/menuCom';
import router from '../router'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
const { Content, Sider } = Layout;

const Layouts: React.FC = () => {
    const [isLayout, setisLayout] = useState(true)
    const location = useLocation()
    useEffect(() => {
        router.forEach(item => {
            console.log(item, "item");
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
                    isLayout ? <Sider width={200} className="site-layout-background">
                        <MenuCom />
                    </Sider> : <></>
                }

                <Layout className={isLayout ? 'padd10' : ''}>
                    <Content className="site-layout-background content">
                        <Routes>
                            <Route path="*" element={<Navigate to="adminHome" />}></Route>
                            {
                                router.map((item, i) =>
                                    <Route key={i} path={item.path} element={
                                        <Suspense fallback={
                                            <div>路由懒加载...</div>
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
        </Layout>
    )
}

export default Layouts;