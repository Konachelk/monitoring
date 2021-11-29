import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private apiPath = 'https://www.barentswatch.no/bwapi/v2/geodata/ais';

  constructor(private http: HttpClient) {
  }


  public openPositions(): Observable<any[]> {
    return <Observable<any[]>> this.http.get(`${this.apiPath}/openpositions?Xmin=10.09094&Xmax=10.67047&Ymin=-64.60&Ymax=64.9`);
  }


}
