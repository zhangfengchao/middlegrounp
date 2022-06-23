/**
 * @param {Object} TabList tab类型
 * @param {Object} TabsInter TabsCom组件props
 */


export interface TabList {
    name: string
    key: number
}

export interface TabsInter {
    tabList: TabList[]
    onTabChange: Function
}

/**
 * @param {Object} OptionChildrenType select类型
 * @param {Object} OptionChildrenType SearchCom组件props
 */


export interface OptionChildrenType {
    value: any
    label: string
}

export interface SearchComType {
    optionChildren: OptionChildrenType[]
    type: number //组件类型1：输入框，2:日期择器，3:提示输入框，4:下拉选择，
    label?: string
    placeholder: string
    completeOption: any[]
}