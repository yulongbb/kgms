import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare let $: any;

@Component({
  selector: 'kgms-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() entities: any;
  @Output() selected = new EventEmitter<string>();

  ngOnInit(): void {
    setTimeout(function () {
      $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });
    }, 500);
  }

  cilckEntity(entity:any){
    console.log(entity)
    this.selected.emit(entity);
  }
}