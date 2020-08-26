import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/_services';
import {IEventEmitter} from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {
  dataReady: boolean;
  params: any;
  rowData = [];
  columnDefs = [
    { headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true },
    { headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true }
  ];

  constructor(private accountService: AccountService) {
    this.accountService.getAll()
      .subscribe(resources => { resources.forEach(node =>
      this.rowData.push(node)
      );
                               this.dataReady = true; }
      );
    console.log(this.rowData);
  }

  ngOnInit(): void {

  }

  // onGridReady(params){
  //   if(this.dataReady){
  //   params.api.setRowData(this.rowData);
  //   console.log(params);}
  // }

}
