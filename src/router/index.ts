import { lazy } from 'react'
interface Router {
    name?: string,
    path: string,
    isLayout: Boolean,
    children?: Array<Router>,
    component: any
}
//Array<Router>的类型限定
const router: Array<Router> = [
    {
        path: '/adminHome',
        isLayout: true,
        component: lazy(() => import('@/views/home/adminHome'))
    },
    {
        path: '/editerForm',
        isLayout: false,
        component: lazy(() => import('@/views/editerForm/editerForm'))
    },
    {
        path: '/memberManage',
        isLayout: true,
        component: lazy(() => import('@/views/organize/memberManage/memberManage'))
    },
    {
        path: '/departmentManage',
        isLayout: false,
        component: lazy(() => import('@/views/organize/departmentManage/departmentManage'))
    },
    {
        path: '/positionManage',
        isLayout: true,
        component: lazy(() => import('@/views/organize/positionManage/positionManage'))
    },

]

export default router
