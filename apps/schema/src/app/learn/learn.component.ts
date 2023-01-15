import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
declare let $: any;

@Component({
  selector: 'kgms-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent implements OnInit {
  instance: any;
  schemas:any;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private route: ActivatedRoute,

    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.appService.getSchema(params['id']).subscribe((schema: any) => {
        this.schemas = schema.children;
        console.log(this.schemas)

      });
    });

    this.http
      .get(`http://localhost:3333/api/entity/Q898`)
      .subscribe((instance: any) => {
        this.instance = instance;
      });
  
  }
}
