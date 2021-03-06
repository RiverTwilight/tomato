import Vue from 'vue'
import Router from 'vue-router'

const CategoryDetail = resolve => require(['@/views/CategoryDetail'], resolve)
const Tomato = resolve => require(['@/views/Tomato'], resolve)
const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

const APP_NAME = '云设'

let routes = [
    { path: '/', redirect: '/tomato' },
    { path: '/todo', component: resolve => require(['@/views/Todo'], resolve) },
    { path: '/tomato/plugin', component: resolve => require(['@/views/TomatoPlugin'], resolve) },
    { path: '/focus', component: resolve => require(['@/views/Focus'], resolve) },
    { path: '/focus/plugin', component: resolve => require(['@/views/FocusPlugin'], resolve) },
    {
        path: '/categories/:id',
        component: CategoryDetail
    },
    {
        path: '/tomato',
        component: Tomato,
        meta: {
            title: '番茄工作法'
        }
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
    },
    {
        path: '*',
        component: Error404,
        meta: {
            title: '页面找不到了'
        }
    },
]

function getTitle(title) {
    if (title) {
        return title
    } else {
        return APP_NAME
    }
}

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = getTitle(to.meta.title)
    } else {
        document.title = getTitle()
    }
    next()
})

export default router
