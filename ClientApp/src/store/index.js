import Vue from 'vue';
import Vuex from 'vuex';
import CandidateService from "../service/candidate.service";
import JobService from "../service/job.service";
// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        jobList: [],
        candidateList: [],
        isLoading: false
    },
    getters: {},
    actions: {
        FETCH_JOBLIST: function (_a) {
            var commit = _a.commit;
            return (new JobService()).fetchAllJobs()
                .then(function (response) {
                commit('UPDATE_JOBLIST', response);
            });
        },
        FETCH_CANDIDATELIST: function (_a, jobId) {
            var commit = _a.commit;
            return (new CandidateService()).fetchCandidateByJobId(jobId)
                .then(function (response) {
                commit('UPDATE_CANDIDATELIST', response);
            });
        },
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
            Vue.set(state, 'isLoading', value);
        },
        UPDATE_JOBLIST: function (state, jobs) {
            Vue.set(state, 'jobList', jobs);
        },
        UPDATE_CANDIDATELIST: function (state, candidates) {
            Vue.set(state, 'candidateList', candidates);
        }
    }
});
