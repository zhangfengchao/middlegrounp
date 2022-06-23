/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
const apiList = {
    loginByAccountPassword: '/api/accountManager/login/loginByAccountPassword',
    getPassword: '/api/accountManager/login/getPassword',
    getUsableFunctions: '/api/functionManager/function/getUsableFunctions',
    getDepartmentTree: '/api/accountManager/department/getDepartmentTree',
    getMemberList: '/api/accountManager/member/getMemberList',//获取部门人员
    addDepartment: '/api/accountManager/department/addDepartment', //创建子部门
    updateDepartmentInfo: '/api/accountManager/department/updateDepartmentInfo', //修改部门
    deleteDepartment: '/api/accountManager/department/deleteDepartment', //删除部门
    getDepartmentDetail: '/api/accountManager/department/getDepartmentDetail', //查看部门详情
    getSelectableMemberList: '/api/accountManager/member/getSelectableMemberList', //查看部门详情
    departmentAddMember: '/api/accountManager/department/departmentAddMember', //部门批量导入成员
    departmentRemoveMember: '/api/accountManager/department/departmentRemoveMember', //部门批量移除成员
    addMember: '/api/accountManager/member/addMember', //创建成员
    getPositionList: '/api/accountManager/position/getPositionList', //获取全部职位
    updateMemberInfo: '/api/accountManager/member/updateMemberInfo', //修改成员信息
    getMemberInfo: '/api/accountManager/member/getMemberInfo', //获取成员基本信息
    memberResign: '/api/accountManager/member/memberResign', //成员离职
    addPosition: '/api/accountManager/position/addPosition', //添加职位
}
/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type apiKeyType = keyof typeof apiList;
/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface apiKeyDataType {
    'loginByAccountPassword': {
        code: number;
        data?: any;
        message?: string
    },
    'getPassword': {
        code: number;
        data?: any;
        message?: string
    },
    'getUsableFunctions': {
        code: number;
        data?: any;
        message?: string
    },
    'getDepartmentTree': {
        code: number;
        data?: any;
        message?: string
    },
    'getMemberList': {
        code: number;
        data?: any;
        message?: string
    },
    'addDepartment': {
        code: number;
        data?: any;
        message?: string
    },
    'updateDepartmentInfo': {
        code: number;
        data?: any;
        message?: string
    },
    'deleteDepartment': {
        code: number;
        data?: any;
        message?: string
    },
    'getDepartmentDetail': {
        code: number;
        data?: any;
        message?: string
    },
    'getSelectableMemberList': {
        code: number;
        data?: any;
        message?: string
    },
    'departmentAddMember': {
        code: number;
        data?: any;
        message?: string
    },
    'departmentRemoveMember': {
        code: number;
        data?: any;
        message?: string
    },
    'addMember': {
        code: number;
        data?: any;
        message?: string
    },
    'getPositionList': {
        code: number;
        data?: any;
        message?: string
    },
    'updateMemberInfo': {
        code: number;
        data?: any;
        message?: string
    },
    'getMemberInfo': {
        code: number;
        data?: any;
        message?: string
    },
    'memberResign': {
        code: number;
        data?: any;
        message?: string
    },
    'addPosition': {
        code: number;
        data?: any;
        message?: string
    }
}

export default apiList;
