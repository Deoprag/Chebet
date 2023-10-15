import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    async checkApiStatus(): Promise<boolean> {
        const url = "http://localhost:8080/api/status";
    
        try {
            const response: any = await this.http.get(url, {}).toPromise();
    
            if (response && response.status === 200 && response.ok) {
                if (response.body && response.body.someCriteria) {
                    return true;
                }
            }
    
            return false;
        } catch (error) {
            return false;
        }
    }
}