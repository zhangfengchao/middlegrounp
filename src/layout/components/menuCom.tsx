import React, { } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        return {
            key: `sub${index + 1}`,
            icon: React.createElement(icon),
            label: `subnav ${index + 1}`,
            children: new Array(4).fill(null).map((_, j) => {
                return {
                    key: index * 4 + j + 1,
                    label: `option${index * 4 + j + 1}`,
                };
            }),
        };
    },
);

const MenuCom: React.FC = () => {
    const nav = useNavigate()

    return (
        <Menu
            onClick={(e: any) => {
                nav('/editerForm')
            }}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={items2}
        />
    )

}

export default MenuCom