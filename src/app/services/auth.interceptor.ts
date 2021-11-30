import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('token')) {
      return next.handle(request);
    }

    return this.authService.getAccesToken().pipe(
      mergeMap((tokenObj: any) => {
        const requestWithHeaders = request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenObj.access_token}`,
          }
        });
        return next.handle(requestWithHeaders);
      })
    );
  }
}
