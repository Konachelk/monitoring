import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { flatMap, startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private apiPath = 'https://www.barentswatch.no/bwapi/v2/geodata/ais';

  constructor(private http: HttpClient) {}

  openPositions({minX, maxX, minY, maxY}): Observable<any[]> {
    return <Observable<any[]>>
      interval(30 * 1000).pipe(
        startWith(0),
        switchMap(() => this.http.get(`${this.apiPath}/openpositions?Xmin=${minX}&Xmax=${maxX}&Ymin=${minY}&Ymax=${maxY}`))
      );
  }

  track(mmsi): Observable<any> {
    return this.http.get(`https://www.barentswatch.no/bwapi/v1/geodata/ais/${mmsi}/opentracks`);
  }
}
