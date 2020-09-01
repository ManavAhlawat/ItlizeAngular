import {Component, OnChanges, OnInit} from '@angular/core';
import {AccountService} from '@app/_services';
import {IEventEmitter} from 'ag-grid-community';
import {ActionService} from '@app/_services/action.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {
  message: any;
  subscription: Subscription;
  dataReady: boolean;
  searchWord: string;
  params: any;
  rowData = [];
  rowDataCopy = [];
  rowDataCopy2 = [];
  columnDefs = [
    { headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true , editable: true, checkboxSelection: true},
    { headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true , editable: true}
  ];
  colName: string;
  csv = [];

  constructor(private accountService: AccountService,
              private actionService: ActionService
              ) {
    this.actionService.setColumnDefs(this.columnDefs);
    // rewrite with action service. SO the data will get from the service first
    // this.accountService.getAll()
    //   .subscribe(resources => { resources.forEach(node =>
    //                             this.rowData.push(node));
    //                             this.rowDataCopy = [...this.rowData];
    //                             this.rowDataCopy2 = [...this.rowData];
    //                             this.actionService.setRowData(this.rowData);
    //     }
    //
    //   );
    this.rowData = [...this.actionService.getRowData()];
    console.log('cnm');
    console.log(this.rowData);
    this.rowDataCopy = [...this.rowData];
    this.rowDataCopy2 = [...this.rowData];
    this.dataReady = true;
   // console.log(this.rowData);
    this.subscription = this.actionService.getMessage().subscribe(message => {
      this.message = message;
      // console.log('message from app component');
      // console.log(this.message);
      if (this.message.text === 'search') {
        this.onChangeSearchBar(); }
      if (this.message.text === 'addRow') {this.onAddRow(); }
      if (this.message.text === 'addColumn') { this.onAddColumn(); }
      if (this.message.text === 'csv') { this.onImportCSV(); }

    });
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    }

  ngOnInit(): void {

  }

  onChangeSearchBar(){
     if (this.searchWord == this.actionService.searchWord) { return; }
     this.searchWord = this.actionService.searchWord;
     if (!this.searchWord) {
      this.rowDataCopy = [...this.rowDataCopy2];
      return; }
     console.log(this.rowDataCopy);
     console.log(this.rowDataCopy2);
     this.dataReady = false;
     this.rowDataCopy = [];
     this.rowDataCopy2.forEach(e => {
      if (e.resourceName.includes(this.searchWord)) {
        this.rowDataCopy.push(e);
      }
    });
     this.dataReady = true;

  }
  onAddRow() {
    // if(this.actionService.addrowButton == false) return;
    this.dataReady = false;
    // this.actionService.addrowButton = false;
    const tempval2 = {...this.rowData[0]};
    tempval2.resourceCode = null;
    tempval2.resourceName = null;
    this.rowDataCopy.push(tempval2);
    const tempval = [...this.rowDataCopy];
    this.rowDataCopy2 = [...this.rowDataCopy];
    this.rowDataCopy = null;
    this.rowDataCopy = this.rowDataCopy2;
    this.actionService.setRowData(this.rowDataCopy);
    console.log(this.rowDataCopy);
    this.dataReady = true;
  }
  onAddColumn() {
    // this.columnDefsCopy.push();
    // console.log('add col');
    if (this.colName == null) { return; }
    const tempval = [...this.columnDefs];
    const tempCol = { headerName: this.colName, field: this.colName, sortable: true, filter: true , editable: true};
    tempval.push(tempCol);
    this.columnDefs = null;
    this.columnDefs = [...tempval];
    this.actionService.setColumnDefs(this.columnDefs);
  }
  onImportCSV(){
    // console.log(this.actionService.csv);
    this.rowDataCopy2 = [...this.actionService.csv];
    this.rowDataCopy = [...this.actionService.csv];
    this.actionService.setRowData(this.rowDataCopy);

  }


}
