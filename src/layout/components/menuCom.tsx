import IconCom from '@/components/IconCom/IconCom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
interface MenuComs {
    icon?: string
    id: number
    key: string
    children?: any[]
}

interface MenuInter {
    menuList: MenuComs[]
    selectedKeys: string
    onMenuClick: Function
}

const MenuCom: React.FC<MenuInter> = (props) => {
    const items2: MenuProps['items'] = props.menuList.map(
        (i: MenuComs) => {
            return {
                key: i.key,
                icon: i.icon ? <IconCom icon={(i as any).icon} /> : null,
                label: (i as any).label,
                children: i.children
            };
        },
    );


    return (
        <Menu
            onClick={(e: any) => props.onMenuClick(e)}
            selectedKeys={[props.selectedKeys]}
            mode="inline"
            items={items2}
        />
    )

}

export default MenuCom