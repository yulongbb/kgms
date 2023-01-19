import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entity',
  pure: false,
})
export class EntityPipe implements PipeTransform {
  private entity: any = null;
  private cachedId = '';

  constructor(private http: HttpClient) {}

  transform(id: any): any {
    if (id !== this.cachedId) {
      this.entity = null;
      this.cachedId = id;
      this.http
        .get(`http://localhost:3333/api/entity/${id.replace('Q', '')}`)
        .subscribe((result: any) => {
          const [firstKey] = Object.keys(result.claims);
console.log(firstKey);
          this.entity = result.claims[firstKey].slice(0, 20);
        });
    }

    return this.entity;
  }
}
