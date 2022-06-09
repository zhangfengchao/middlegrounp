import { lazy } from 'react'
interface Router {
    name?: string,
    path: string,
    isLayout: Boolean,
    children?: Array<Router>,
    component: any
}
// 如果你是js就直接无视这个: Array<Router>的类型限定
const router: Array<Router> = [
    {
        path: '/adminHome',
        isLayout: true,
        component: lazy(() => import('../views/home/adminHome'))
    },
    {
        path: '/editerForm',
        isLayout: false,
        component: lazy(() => import('../views/editerForm/editerForm'))
    },
    // {
    //     path: '/blogDetail',
    //     component: lazy(() => import('../views/blogDetail/blogDetail'))
    // },

]

export default router
