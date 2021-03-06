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
import CandidateCardComponent from '../component/candidatecard.component.vue';
var JobDetailPage = /** @class */ (function (_super) {
    __extends(JobDetailPage, _super);
    function JobDetailPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JobDetailPage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.jobId) {
            return store.dispatch('FETCH_CANDIDATELIST', route.params.jobId);
        }
    };
    Object.defineProperty(JobDetailPage.prototype, "model", {
        get: function () {
            return this.$store.state.candidateList;
        },
        enumerable: true,
        configurable: true
    });
    JobDetailPage = __decorate([
        Component({
            name: 'JobDetailPage',
            components: {
                'candidatecard': CandidateCardComponent
            },
        })
    ], JobDetailPage);
    return JobDetailPage;
}(Vue));
export default JobDetailPage;
