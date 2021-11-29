import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (request.url.includes('barentswatch')) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCM0I1NEUyRkQ5OUZCQkY5NzVERDMxNDBDREQ4OEI1QzA5RkFDRjMiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJDenRVNHYyWi03LVhYZE1VRE4ySXRjQ2ZyUE0ifQ.eyJuYmYiOjE2MzgyMDU2NjUsImV4cCI6MTYzODIwOTI2NSwiaXNzIjoiaHR0cHM6Ly9pZC5iYXJlbnRzd2F0Y2gubm8iLCJhdWQiOiJhcGkiLCJjbGllbnRfaWQiOiJrb25hY2hlbGtAZ21haWwuY29tOm1vbml0b3JpbmctY29udGVzdCIsInNjb3BlIjpbImFwaSJdfQ.NKaPQlgz7l-RhUr_TPYSmhXgQulqKy57kRLKi5NdwHx2rTg8tshgp9rzqssitZo2OO7eVEliP1dzwevJfKWmQljuCsLQnGsVaBsL486Z6549Bz5CwJ7InHJ_j40kLb-Wt2E_51RwhBO6R8LaUzmNy85wmg5L32WIOcBoYucqVoU4YANoVsVRDyRW5qfhjQcBh2Z3AHwkqFGsbqfM4uObtVrw7sdOKUFJDOaaTmGzQm2yymHOp5boauR19TI-k54NWo4LRR8CkfKs2ExAmHAFS-al-cxyyVf9QsNddEOwPFGsYRoTLvJD28IqpXoPIKXrEfJOgQvhboUHuHM3ZDxjuVfzLjkWP8bRaeFN4lCE6bVaBv1qtDdyO49cAS-yDRdei4Z2hJORXwE1zQSDOtKl79AiiCYh2LUR_uO76eGwWfXA1eEzYL2D8Sp4DmoNuzSYkYK1LzTaQH1pDk6FRRJdd5uO_Rz6tF0ieUoLY3mfyQ07iDcgs-kW-d_BBqXBj8RQXQWALoFw3rAPly1Mm9Tp0R-I5MXj5m34T1X1dLru1HdAdZTEgqM1liaBDvi015TzRlf-RI50W4q-5Dp5J0woBLXH3TFnHZ17hf1770Mbm6pjFok-Ljqmx2_UPhLV-pe_W-m7YH-NWF4CgMoeCtVm3Wz4BgvJQ_3SGUS0w4X6Gy0';
      const requestWithHeaders = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next.handle(requestWithHeaders);
    // }
    // return next.handle(request);
  }
}
