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

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private appService: AppService
  ) {}

  hasChild = (_: number, node: any) => node.expandable;


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
        this.dataSource.data = this.schema.children;
      });
    });
  }

  openDialog(node:any) {
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
          parent: node.id,
        } as Schema)
        .subscribe((schema) => {
          console.log(schema);
        });
    });
  }
}
