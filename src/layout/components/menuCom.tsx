import React, { useEffect, useState } from 'react'
import IconCom from '@/components/IconCom/IconCom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosFunc from '@/axios/axios';
import { useSelector } from 'react-redux';

interface MenuComs {
    icon?: string
    id: number
    key: string
    children?: any[]
}

const MenuCom: React.FC = () => {
    const nav = useNavigate()
    const type = useSelector((state: any) => state.middlegrounp.menuType)
    const [menuList, setmenuList] = useState<MenuComs[]>([])
    const items2: MenuProps['items'] = menuList.map(
        (i, index) => {
            return {
                key: i.key,
                icon: <IconCom icon={(i as any).icon} />,
                label: (i as any).label,
                children: i.children
            };
        },
    );
    useEffect(() => {
        console.log(type);
        getAllMenu()
        return () => {

        }
    }, [type])// eslint-disable-line

    const getAllMenu = async () => {
        let res = await axiosFunc({
            url: 'getUsableFunctions',
            method: 'GET',
            data: {
                type: 2,
            }
        })

        if (res.code === 200) setmenuList(res.data)
    }


    return (
        <Menu
            onClick={(e: any) => {
                console.log(e.key);
                nav(e.key)
            }}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={items2}
        />
    )

}

export default MenuCom