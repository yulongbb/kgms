import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linked',
  pure: false,
})
export class LinkedPipe implements PipeTransform {
  private text: any = null;
  private cachedText = '';

  constructor(private http: HttpClient) {}

  transform(text: any, linkeds: any): any {
    if (text !== this.cachedText) {
      this.text = text;
      this.cachedText = text;
      linkeds.forEach((linked: any) => {
        linked.names.forEach((name: string) => {
          this.text = this.text.replaceAll(
            name,
            `<a target='_blank' href='/instance/detail/${linked.id}?id=15' class='text-primary'>${name}</a>`
          );
        });
      });
    }

    return this.text;
  }
}
