import http from './http-base';

export default class CandidateService {
    private baseUrl = '/candidate';

    fetchCandidateByJobId(jobId) {
        return http.get(`${this.baseUrl}/job/${jobId}`)
            .then(x => x);
    }
}