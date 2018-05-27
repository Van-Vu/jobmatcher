import Vue from "vue";
//import { Component, Watch } from "vue-property-decorator";

import Component from 'vue-class-component';

import LogService from './service/log.service';
import router from './router'

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
}

@Component({
    name: "App",
    components: {
    },
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'Fun with Local',
        meta: [
            { vmid: 'charset', charset: 'utf-8' },
            { vmid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
            { vmid: 'theme-color', name: 'theme-color', content: '#99CD4E' },
            { vmid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
            { vmid: 'description', name: 'description', content: 'Desire for unique experiences like a local with no booking fee? Includes travel tips, do and dont, hidden gems, indoor, outdoor activities. Check this out !' },
            { vmid: 'ogtitle', property: 'og:title', content: 'Fun with Local' },
            { vmid: 'ogtype', property: 'og:type', content: 'website' },
            { vmid: 'ogurl', property: 'og:url', content: 'https://funwithlocal.com' },
            { vmid: 'ogsitename', property: 'og:site_name', content: 'Fun with Local' },
            { vmid: 'ogdescription', property: 'og:description', content: 'Fun with Local' },
            { vmid: 'twitterdomain', property: 'twitter:domain', content: 'funwithlocal.com' },
            { vmid: 'twittersite', property: 'twitter:site', content: '@FunWithLocal' }
        ],
        link: [
            { vmid: 'manifest', rel: 'manifest', href: '/manifest.json' }
        ],
        //Bodom: dangerous
        __dangerouslyDisableSanitizers: ['meta']
    }
})

export default class App extends Vue {
    created() {

        //  [App.vue specific] When App.vue is first loaded start the progress bar
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            //  start the progress bar
            //this.$Progress.start();
            this.$store.dispatch("ENABLE_LOADING");
            if (process.env.VUE_ENV === 'client') {
                window.scrollTo(0, 0);
            }
            //  continue to next page
            next();
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            //this.$Progress.finish();
            this.$store.dispatch("DISABLE_LOADING");
        })

    }

    mounted() {
        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");
    }

    onSaveSchedule(event) {
        console.log(event);
    }

    onCloseModal() {
        this.$store.dispatch('HIDE_MODAL');        
    }
}
