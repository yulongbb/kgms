import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from './app.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

export interface Schema {
  name: string;
  description: string;
}

@Component({
  selector: 'kgms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'schema';
  schemas: any;

  id: any;
  graph: any;

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appService
      .getSchemas()
      .subscribe((schemas: any) => (this.schemas = schemas));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      if(params['id']){
        this.id = params['id'];
        this.appService.getSchema(params['id']).subscribe((graph:any)=>{
          this.graph = graph;
        })
      }
    })
  }

  deleteSchema(id:number){
    this.appService.deleteSchema(id).subscribe((schema:any)=>{
      this.schemas = this.schemas.filter((schema:any) => schema.id!=id)
      this.router.navigateByUrl('/schema')
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: '', description: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      result.name = result.name.trim();
      if (!result.name) {
        return;
      }
      result.description = result.description.trim();
      if (!result.description) {
        return;
      }
      if (!result) {
        return;
      }
      this.appService
        .addSchema({ name: result.name,
          description: result.description,} as Schema)
        .subscribe((schema) => {
          console.log(schema);
          this.schemas.push(schema);
        });
    });
  }
}

@Component({
  selector: 'kgms-dialog',
  templateUrl: './app-dialog.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Schema
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
