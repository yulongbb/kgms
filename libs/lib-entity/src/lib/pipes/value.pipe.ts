import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value',
  pure: false,
})
export class ValuePipe implements PipeTransform {
  private value: any = null;
  private cachedId = '';

  constructor(private http: HttpClient) {}

  transform(id: any): any {
    if (id !== this.cachedId) {
      this.value = null;
      this.cachedId = id;
      this.http
        .get(`http://localhost:3333/api/entity/node/${id.replace('Q', '')}`)
        .subscribe((result: any) => (this.value = result.label));
    }

    return this.value;
  }
}
