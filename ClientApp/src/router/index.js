import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
var HomePage = function () { return import('../page/home.page.vue'); };
var JobDetailPage = function () { return import('../page/jobDetail.page.vue'); };
import Meta from 'vue-meta';
Vue.use(VueRouter);
Vue.use(Meta);
var router = new VueRouter({
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
});
router.afterEach(function (to, from) {
    store.dispatch("DISABLE_LOADING");
});
export default router;
