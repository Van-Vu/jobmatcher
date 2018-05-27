import http from './http-base';
var CandidateService = /** @class */ (function () {
    function CandidateService() {
        this.baseUrl = '/candidate';
    }
    CandidateService.prototype.fetchCandidateByJobId = function (jobId) {
        return http.get(this.baseUrl + "/job/" + jobId)
            .then(function (x) { return x; });
    };
    return CandidateService;
}());
export default CandidateService;
