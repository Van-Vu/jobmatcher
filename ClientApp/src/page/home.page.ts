import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import VueRouter from 'vue-router';
import { Utils } from '../component/utils';
import { ScreenSize } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import vMediaQuery from '../component/v-media-query';
Vue.use(vMediaQuery);

@Component({
    name: 'HomePage',
    components: {
    }
})

export default class HomePage extends Vue{
    $mq: any;

    static asyncData({ store, route }) {
        return store.dispatch('FETCH_JOBLIST');
    }

    get jobList() {
        return this.$store.state.jobList;
    }

    mounted() {
        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                break;

            case ScreenSize.Tablet:
                break;

            case ScreenSize.Mobile:
                break;
        }

    }
}
