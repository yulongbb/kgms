import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent, Schema } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'kgms-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
})
export class SchemaComponent implements OnInit {
  schemas: any;
  id: any;
  graph: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private appService: AppService
  ) {
    this.appService
      .getSchemas()
      .subscribe((schemas: any) => (this.schemas = schemas));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (!params['id']) {
        this.id = null;
        this.graph = null;
        return;
      }
      this.id = params['id'];
      this.appService.getSchema(params['id']).subscribe((schema: any) => {
        this.graph = schema;
      });
    });
  }

  select($event: any) {
    this.id = $event.id;
  }

  getSchema(id: any) {
    this.appService.getSchema(id).subscribe((schema: any) => {
      this.graph = schema;
    });
  }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: '', description: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result.name = result.name.trim();
      if (!result.name) {
        return;
      }
      result.description = result.description.trim();
      if (!result.description) {
        return;
      }
      this.appService
        .addSchema({
          name: result.name,
          description: result.description,
          parent: id,
        } as Schema)
        .subscribe((schema) => {
          this.getSchema(this.graph.id);
        });
    });
  }
}
