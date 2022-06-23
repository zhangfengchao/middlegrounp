import React from 'react'
import * as icons from '@ant-design/icons'

const IconCom = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;
    return React.createElement(antIcon[icon]);
};

export default IconCom
