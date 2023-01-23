import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
  graph: any;
  schemas: any;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.graph = params['id'];
      this.appService.getSchema(params['id']).subscribe((schema: any) => {
        this.schemas = schema.children;
        console.log(this.schemas);
      });
    });
  }

  openDialog(entity: any) {
    const dialogRef = this.dialog.open(EntityDialogComponent, {
      data: entity,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      const property = {
        name: '图片',
      };
      this.http
        .post(`http://localhost:3333/api/property/${this.graph}`, property)
        .subscribe((predicate: any) => {
          const turtle = {
            subject: result.labels['zh-cn'].value,
            predicate: `P${predicate.id}`,
            object: result.image,
          };
          console.log(turtle);

          // 更新节点
          const node = {
            id: result.id,
            image: result.image,
          };
          this.http
            .post(`http://localhost:3333/api/entity/node`, node)
            .subscribe((node: any) => {
              console.log(node);
            });
          // 更新entity
          this.http
            .post(`http://localhost:3333/api/entity/${this.graph}`, turtle)
            .subscribe((instance: any) => {
              this.instance = instance;
            });
        });
    });
  }
}

@Component({
  selector: 'kgms-entity-dialog',
  templateUrl: './entity-dialog.html',
})
export class EntityDialogComponent {
  instance: any;
  statements: Map<string, Array<string>>;

  constructor(
    public dialogRef: MatDialogRef<EntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.statements = new Map<string, Array<string>>();
    this.http
      .get(
        `http://localhost:3333/api/entity/${data.mainsnak.datavalue.value.id}`
      )
      .subscribe((instance: any) => {
        this.instance = instance;
        Object.keys(instance.claims).map((key: string) => {
          const values = new Array<string>();
          instance.claims[key].forEach((value: any) => {
            values.push(value.mainsnak.datavalue.value.id);
          });
          this.statements.set(key, values);
        });
        console.log(this.statements);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
