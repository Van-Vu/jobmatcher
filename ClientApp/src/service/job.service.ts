import http from './http-base';

export default class JobService {
    private baseUrl = '/job';

    fetchAllJobs() {
        return http.get(`${this.baseUrl}/getall`)
            .then(x => x);
    }
}