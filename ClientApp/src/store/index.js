import Vue from 'vue';
import Vuex from 'vuex';
// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        jobList: [],
        candidateList: []
    },
    getters: {},
    actions: {
        ENABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', true);
        },
        DISABLE_LOADING: function (_a) {
            var commit = _a.commit;
            commit('ISLOADING', false);
        },
    },
    mutations: {
        ISLOADING: function (state, value) {
            //Vue.set(state, 'isLoading', value);
        }
    }
});
