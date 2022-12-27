import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getSchemas(): Observable<any> {
    const schemas = this.http.get('http://localhost:3333/api/schemas');
    return schemas;
  }


  addSchema(schema: any): Observable<any> {
    return this.http.post<any>('http://localhost:3333/api/schemas', schema);
  }


  getSchema(id: number): Observable<any> {
    const schema = this.http.get(`http://localhost:3333/api/schemas/${id}`);
    return schema;
  }


  deleteSchema(id: number): Observable<any> {
    const schema = this.http.delete(`http://localhost:3333/api/schemas/${id}`);
    return schema;
  }


}
