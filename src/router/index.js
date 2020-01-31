/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/')
    },
    {
        path: '/',
        component: () =>
            import ('@/views/tab-bar/'),
        children: [{
                path: '',
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa')
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my')
            },
            {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video')
            }
        ]
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: () =>
            import ('@/views/user/')
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search/')
    },
    {
        path: '/article/:articleId',
        name: 'search',
        component: () =>
            import ('@/views/articles/'),
        // 将路由动态参数映射到组件的 props 中，更推荐这种做法
        props: true
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router