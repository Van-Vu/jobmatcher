import Vue from "vue";
import { Component } from "vue-property-decorator";
import VueRouter  from "vue-router";
import store from '../store';

const HomePage = () => import('../page/home.page.vue')
const JobDetailPage = () => import('../page/jobDetail.page.vue')

import Meta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(Meta);

const router = new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
        {
            path: "/job/:seoString-:jobId(\\d+)",
            name: "jobDetail",
            component: JobDetailPage,
            props: true
        },
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "",
            redirect: { name: 'home' }
        },
        {
            path: "*",
            redirect: { name: 'home' }
        }
    ]
})

router.afterEach((to, from) => {
    store.dispatch("DISABLE_LOADING")
})

export default router