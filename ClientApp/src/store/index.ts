import Vue from 'vue'
import Vuex from 'vuex'

// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
import { plainToClass } from "class-transformer";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jobList: [],
        candidateList: []
    },
    getters: {
    },
    actions: {
        ENABLE_LOADING({commit}) {
            commit('ISLOADING', true);    
        },
        DISABLE_LOADING({ commit }) {
            commit('ISLOADING', false);
        },
    },
    mutations: {
        ISLOADING(state, value) {
            //Vue.set(state, 'isLoading', value);
        }
    }
})
