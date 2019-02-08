import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormsApiService {
  constructor(private client: Http) {}

  getLoginForm(): Observable<any> {
    return this.client.get('assets/forms/loginform.json').pipe(map(t => t.json()));
  }

  getRegistrationForm(): Observable<any> {
    return this.client.get('assets/forms/registrationform.json').pipe(map(t => t.json()));
  }

  getAllAvailableControls(): Observable<any> {
    return this.client.get('assets/forms/all-available-controls.json').pipe(map(t => t.json()));
  }
}
