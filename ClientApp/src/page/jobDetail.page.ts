import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import CandidateCardComponent from '../component/candidatecard.component.vue';

@Component({
    name: 'JobDetailPage',
    components: {
        'candidatecard': CandidateCardComponent
    },
})

export default class JobDetailPage extends Vue {
    static asyncData({ store, route }) {
        if (route.params.jobId) {
            return store.dispatch('FETCH_CANDIDATELIST', route.params.jobId);
        }
    }

    get model() {
        return this.$store.state.candidateList;
    }
}