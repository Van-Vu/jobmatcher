import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
    name: 'JobDetailPage',
    components: {
    },
})

export default class JobDetailPage extends Vue {
    static asyncData({ store, route }) {
        if (route.params.jobId) {
            return store.dispatch('FETCH_CANDIDATE_BY_JOBID', route.params.jobId);
        }
    }

    get model() {
        return this.$store.state.candidateList;
    }
}