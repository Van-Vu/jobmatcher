// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root';
import Vue from 'vue';
import merge from 'lodash.merge';
import { Utils } from './component/utils';
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate: function (to, from, next) {
        store.dispatch("ENABLE_LOADING");
        if (this.asyncData) {
            this.asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        }
        else {
            next();
        }
    }
});
if (window.__INITIAL_STATE__) {
    var initialState = window.__INITIAL_STATE__;
    store.replaceState(merge({}, store.state, initialState));
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady(function () {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    console.log('hit the client');
    router.beforeResolve(function (to, from, next) {
        var matched = router.getMatchedComponents(to);
        var prevMatched = router.getMatchedComponents(from);
        // we only care about none-previously-rendered components,
        // so we compare them until the two matched lists differ
        var diffed = false;
        var activated = matched.filter(function (c, i) {
            return diffed || (diffed = (prevMatched[i] !== c));
        });
        if (!activated.length) {
            return next();
        }
        // this is where we should trigger a loading indicator if there is one
        Promise.all(activated.map(function (component) {
            //console.log('here in client:' + (c as any).options.methods.asyncData)
            if (component && component.asyncData) {
                return component.asyncData({ store: store, route: to });
            }
        })).then(function () {
            next();
        }).catch(function (err) {
            Utils.handleRouteError(store, to, err);
            if (process.env.NODE_ENV !== 'production') {
                console.log('Bodom catch');
                console.log(err);
            }
            next();
        });
    });
    // actually mount to DOM
    app.$mount('#app');
});
// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
}
