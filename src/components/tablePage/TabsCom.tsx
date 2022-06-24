import { Space, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons'
import { TabsInter, TabList } from '../interfaceCom/InterfaceCom'

const { TabPane } = Tabs;

const TabsCom: React.FC<TabsInter> = (props) => {
    useEffect(() => {
        // console.log(props, "props")

        return () => {

        }
    }, [props])


    return (
        <div>
            <Tabs
                type={'card'}
                defaultActiveKey="1" tabPosition={'top'} onChange={(e: any) => props.onTabChange(e)
                } moreIcon={
                    <Space className='w_100 size12 grey'>
                        更多
                        <DownOutlined />
                    </Space>}>
                {props.tabList.map((i: TabList) => (
                    <TabPane tab={i.name} key={i.key} />
                ))}
            </Tabs>
        </div>
    );
};

export default TabsCom;