import Vue from 'vue'
import Vuex from 'vuex'

import CandidateService from "../service/candidate.service";
import JobService from "../service/job.service";

// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
import { plainToClass } from "class-transformer";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jobList: [],
        candidateList: [],
        isLoading: false
    },
    getters: {
    },
    actions: {
        FETCH_JOBLIST({commit}) {
            return (new JobService()).fetchAllJobs()
                .then(response => {
                    commit('UPDATE_JOBLIST', response);
                });
        },
        FETCH_CANDIDATELIST({commit}, jobId) {
            return (new CandidateService()).fetchCandidateByJobId(jobId)
                .then(response => {
                    commit('UPDATE_CANDIDATELIST', response);
                });
        },        
        ENABLE_LOADING({commit}) {
            commit('ISLOADING', true);    
        },
        DISABLE_LOADING({ commit }) {
            commit('ISLOADING', false);
        },
    },
    mutations: {
        ISLOADING(state, value) {
            Vue.set(state, 'isLoading', value);
        },
        UPDATE_JOBLIST(state, jobs) {
            Vue.set(state, 'jobList', jobs);
        },
        UPDATE_CANDIDATELIST(state, candidates) {
            Vue.set(state, 'candidateList', candidates);
        }        
    }
})
