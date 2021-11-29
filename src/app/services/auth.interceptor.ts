import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (request.url.includes('barentswatch')) {
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCM0I1NEUyRkQ5OUZCQkY5NzVERDMxNDBDREQ4OEI1QzA5RkFDRjMiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJDenRVNHYyWi03LVhYZE1VRE4ySXRjQ2ZyUE0ifQ.eyJuYmYiOjE2MzgyMDE2MTQsImV4cCI6MTYzODIwNTIxNCwiaXNzIjoiaHR0cHM6Ly9pZC5iYXJlbnRzd2F0Y2gubm8iLCJhdWQiOiJhcGkiLCJjbGllbnRfaWQiOiJrb25hY2hlbGtAZ21haWwuY29tOm1vbml0b3JpbmctY29udGVzdCIsInNjb3BlIjpbImFwaSJdfQ.Ap7F42x_49MshZ_A7zTjB-V_GPveb4U5dn3XuPBXyenBF_hVXn6bB1APY_W-AN7BhOtw-0rOYadeCZNsZd_UCwho90K-VOXkXI4VV2XlRNDUZzvWlhOp9hGBUJ-2AZ17fplWGHBsXMGkKu3pw05zb4ZDCq8KF_K2PAxOxKddgDU4qV8bYH9Tt83g2QC9QitHOw0_MrQ5xebE3Kgm9-ZpdibUA7jjS1jBxIOZdxzhWsbxr69pqn2c71Nujs6HTTzASBSXOBR2fDZjgIvg-tWiY3qpspkaCR_a1On9cO6C3_TfxZyNef3NSx6Kb-XhVtepH9uxJcWzQ_ghgkr6QDq-uDzU2UUmzxdmoPFVzpoVlMXQy4bXM4qD0QaGdIP5XeQcNzKsKeJ9k5FM_bArZzRC-md3eWub1Xd7wQ2C02677akS45-VoROtgKuzDg1W2zIqxlx64v8PSJMwRfjfn37zWC4HdfDsLCFHTztFOl_ntuYoWU3aMpj5maB6pg4JGIZKr4R7UhaQ69C6xyZAJ6tuvgUBMJ0opVz7YGSDB1XxKiqxx_3NXCz4fxjkLt1o975LM4qGwQ4nc4_lJZIZboLuyKc-8njuO2xlyvDkVfKXfw4jP8cQSkSLtFI7YfhqFG6Zhadm5NQ0x8k2cIik_2QKG0_5qDBVRzh8ELfhoOspKWs';
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
