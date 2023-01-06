import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent, Schema } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'kgms-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
})
export class SchemaComponent implements OnInit {
  id: any;
  schema: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params['id']);
      if (!params['id']) {
        this.id = null;
        this.schema = null;
        return;
      }
      this.id = params['id'];
      this.appService.getSchema(params['id']).subscribe((schema: any) => {
        this.schema = schema;
        console.log(schema)
      });
    });
  }

  select($event:any){
    this.id = $event.id;
  }


  openDialog(id:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      result = result.trim();
      if (!result) {
        return;
      }
      this.appService
        .addSchema({
          name: result,
          parent: id,
        } as Schema)
        .subscribe((schema) => {
          console.log(schema);
        });
    });
  }
}
