﻿import router from '../router';
import { GlobalConfig } from '../GlobalConfig';
import { NotificationType } from '../model/enum';

declare function unescape(s: string): string;
declare function escape(s: string): string;

export class Utils {
    public static seorizeString(name: string) {
        if (!!name) {
            let sanitizeName = name.toLowerCase().replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "").trim();
            return sanitizeName.split(' ').join('-');            
        }

        return '';
    }

    public static handleXHRError(store, error: any) {
        // server doesn't need notification
        if (process.env.VUE_ENV === 'client') {
            store.dispatch("DISABLE_LOADING");

            switch (error.status) {
                case 400:
                    store.dispatch('ADD_NOTIFICATION', { title: "Submit incorrect information", type: NotificationType.Error });
                    break;
                case 401:
                    store.dispatch('ADD_NOTIFICATION', { title: "You are not authorized to view this page!", type: NotificationType.Error });
                    break;
                case 403:
                    store.dispatch('ADD_NOTIFICATION', { title: "Permission denied", text: "Please login OR contact us if you believe there's something wrong", type: NotificationType.Warning });
                    break;
                case 422:
                    store.dispatch('ADD_NOTIFICATION', { title: "Login error", text: "Email or Password is incorrect", type: NotificationType.Warning });
                    break;
                case 500:
                    store.dispatch('ADD_NOTIFICATION', { title: "Error occurs but no worries, we're on it!", type: NotificationType.Error });
                    break;
            }

        }
    }

    public static handleRouteError(store, route, error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(route);
        }

        switch (error.status) {
            case 400:
                router.push('home');
                break;
            case 401:
                router.push(`/login/?returnUrl=${route.fullPath}`);
                break;
            case 403:
                if (store.getters.isLoggedIn) {
                    window.location.href = '/static/page/403.html';
                    //router.push('/static/page/403.html');
                } else {
                    router.push(`/login/?returnUrl=${route.fullPath}`);    
                }
                break;
            case 404:
                window.location.href = '/static/page/404.html';
                break;
            case 500:
                window.location.href = '/static/page/500.html';
                break;
        }
    }

    public static getCurrentHost() {
        return process.env.NODE_ENV == 'production'
            ? GlobalConfig.accessControl.prod
            : GlobalConfig.accessControl.dev;
    }
}