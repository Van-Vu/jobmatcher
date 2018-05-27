import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Utils } from '../component/utils';

@Component({
    name: "JobCardComponent",
    components: {
    }
})

export default class JobCardComponent extends Vue {
    @Prop() model: any;

    get seoName() {
        return Utils.seorizeString(this.model.name);
    }
    
    created(): void {
    }
}
