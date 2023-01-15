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
        .subscribe((result: any) =>
          Object.keys(result.claims).map((key: any) => {
            if(result.claims[key].length>10){
              this.entity = result.claims[key].slice(0, 20);
            }
          })
        );
    }

    return this.entity;
  }
}
