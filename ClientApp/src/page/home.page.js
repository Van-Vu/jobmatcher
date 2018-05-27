var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ScreenSize } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import JobCardComponent from '../component/jobcard.component.vue';
import vMediaQuery from '../component/v-media-query';
Vue.use(vMediaQuery);
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        return store.dispatch('FETCH_JOBLIST');
    };
    Object.defineProperty(HomePage.prototype, "jobList", {
        get: function () {
            return this.$store.state.jobList;
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.mounted = function () {
        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                break;
            case ScreenSize.Tablet:
                break;
            case ScreenSize.Mobile:
                break;
        }
    };
    HomePage = __decorate([
        Component({
            name: 'HomePage',
            components: {
                'jobcard': JobCardComponent
            }
        })
    ], HomePage);
    return HomePage;
}(Vue));
export default HomePage;
