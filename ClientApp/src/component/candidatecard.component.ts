import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RadialProgressBar from 'vue-radial-progress';

@Component({
    name: "CandidateCardComponent",
    components: {
        'radial-progress-bar': RadialProgressBar
    }
})

export default class CandidateCardComponent extends Vue {
    @Prop() model: any;

    get percentage() {
        return this.model.percentageMatch;
    }

    get total() {
        return 100;
    }
    created(): void {
    }
}
