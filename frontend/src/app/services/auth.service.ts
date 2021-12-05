import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiPath = 'https://id.barentswatch.no/connect/token';

  constructor(private http: HttpClient) {}

  getAccesToken() {
    const body = new URLSearchParams();
    body.set('client_id', 'konachelk@gmail.com:monitoring-contest');
    body.set('scope', 'api');
    body.set('client_secret', 'kNM5qChL5KVd2AJ');
    body.set('grant_type', 'client_credentials');
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return this.http.post(`${this.apiPath}`, body.toString(), {headers});
  }


}
