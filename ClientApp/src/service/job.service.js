import http from './http-base';
var JobService = /** @class */ (function () {
    function JobService() {
        this.baseUrl = '/job';
    }
    JobService.prototype.fetchAllJobs = function () {
        return http.get(this.baseUrl + "/getall")
            .then(function (x) { return x; });
    };
    return JobService;
}());
export default JobService;
