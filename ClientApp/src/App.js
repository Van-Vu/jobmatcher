var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
//import { Component, Watch } from "vue-property-decorator";
import Component from 'vue-class-component';
import LogService from './service/log.service';
// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in. Only available in 2.2.0+
    if (process.env.NODE_ENV !== 'production') {
        console.log(info);
        console.log(err);
    }
    (new LogService()).logError(err.message, err.stack);
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.created = function () {
        var _this = this;
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach(function (to, from, next) {
            //  start the progress bar
            //this.$Progress.start();
            _this.$store.dispatch("ENABLE_LOADING");
            if (process.env.VUE_ENV === 'client') {
                window.scrollTo(0, 0);
            }
            //  continue to next page
            next();
        });
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach(function (to, from) {
            //  finish the progress bar
            //this.$Progress.finish();
            _this.$store.dispatch("DISABLE_LOADING");
        });
    };
    App.prototype.mounted = function () {
        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");
    };
    App.prototype.onSaveSchedule = function (event) {
        console.log(event);
    };
    App.prototype.onCloseModal = function () {
        this.$store.dispatch('HIDE_MODAL');
    };
    App = __decorate([
        Component({
            name: "App",
            components: {},
            metaInfo: {
                // if no subcomponents specify a metaInfo.title, this title will be used
                title: 'Job Matcher',
                meta: [
                    { vmid: 'charset', charset: 'utf-8' },
                    { vmid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
                    { vmid: 'theme-color', name: 'theme-color', content: '#99CD4E' },
                    { vmid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
                    { vmid: 'description', name: 'description', content: 'Test desc' },
                    { vmid: 'ogtitle', property: 'og:title', content: 'Job Matcher' },
                    { vmid: 'ogtype', property: 'og:type', content: 'website' },
                    { vmid: 'ogurl', property: 'og:url', content: 'https://jobmatcher.com' },
                    { vmid: 'ogsitename', property: 'og:site_name', content: 'Job Matcher' },
                    { vmid: 'ogdescription', property: 'og:description', content: 'Job Matcher' },
                    { vmid: 'twitterdomain', property: 'twitter:domain', content: 'jobmatcher.com' },
                    { vmid: 'twittersite', property: 'twitter:site', content: '@JobMatcher' }
                ],
                link: [
                    { vmid: 'manifest', rel: 'manifest', href: '/manifest.json' }
                ],
                //Bodom: dangerous
                __dangerouslyDisableSanitizers: ['meta']
            }
        })
    ], App);
    return App;
}(Vue));
export default App;
