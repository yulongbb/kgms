import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'property',
  pure: false,
})
export class PropertyPipe implements PipeTransform {
  private prop: any = null;
  private cachedId = '';

  constructor(private http: HttpClient) {}

  transform(id: any): any {
    if (id !== this.cachedId) {
      this.prop = null;
      this.cachedId = id;
      this.http
        .get(`http://localhost:3333/api/property/${id}`)
        .subscribe((result: any) => (this.prop = result.name));
    }

    return this.prop;
  }
}
