import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormsApiService {
    constructor(private client: HttpClient) {}

    getLoginForm(): Observable<any> {
        return this.client.get('assets/forms/loginform.json');
    }

    getRegistrationForm(): Observable<any> {
        return this.client.get('assets/forms/registrationform.json');
    }

    getAllAvailableControls(): Observable<any> {
        return this.client.get('assets/forms/all-available-controls.json');
    }

    getByName(name: string) {
        return this.client.get(`assets/forms/${name}.json`);
    }
}
