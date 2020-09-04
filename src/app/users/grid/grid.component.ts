import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '@app/_services';
import {IEventEmitter} from 'ag-grid-community';
import {ActionService} from '@app/_services/action.service';
import {Subscription} from 'rxjs';
import {CompleterData, CompleterService, Ng2CompleterModule} from 'ng2-completer';
import { User} from '@app/_models';
import {Papa} from 'ngx-papaparse';
import {NgxSpinnerService} from 'ngx-spinner';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {
  @ViewChild('ng2Completer') ng2Completer;
  user: User;
  private csvRecords: any[];
  @ViewChild('agGrid') agGrid: AgGridAngular;
  searchString: string;
  datasource = [];
  message: any;
  subscription: Subscription;
  dataReady: boolean;
  searchWord: string;
  params: any;
  rowData = [];
  rowDataCopy = [];
  rowDataCopy2 = [];
  columnDefs = [
    {headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true, editable: true, checkboxSelection: true},
    {headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true, editable: true}
  ];
  colName: string;
  csv = [];

  constructor(private accountService: AccountService,
              private actionService: ActionService,
              private papa: Papa,
              private spinner: NgxSpinnerService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    const csvData = '"Hello","World!"';
    this.papa.parse(csvData, {
      complete: (result) => {
        console.log('Parsed: ', result);
      }
    });
    this.actionService.setColumnDefs(this.columnDefs);
    this.rowData = [...this.actionService.getRowData()];
    this.rowDataCopy = [...this.rowData];
    this.rowDataCopy2 = [...this.rowData];
    this.datasource = [...this.actionService.getDatasource()];
    this.dataReady = true;
    // console.log(this.rowData);
    this.subscription = this.actionService.getMessage().subscribe(message => {
      this.message = message;
      // console.log('message from app component');
      // console.log(this.message);
      if (this.message.text === 'search') {
        this.onChangeSearchBar();
      }
      if (this.message.text === 'addRow') {
        this.onAddRow();
      }
      if (this.message.text === 'addColumn') {
        this.onAddColumn();
      }
      if (this.message.text === 'csv') {
        this.onImportCSV();
      }

    });
  }
  handleDropedFile(evt) {
    this.csvRecords = [];
    this.spinner.show();
    const files = evt.target.files;  // File List object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: results => {
          const data = results.data;
          this.csvRecords = data;
          console.log(this.csvRecords);
          this.actionService.csv = this.csvRecords;
          const total = this.csvRecords.length;
          if (total == 0) {
            this.spinner.hide();
            alert('no data in csv');
            return;
          }
          this.actionService.sendMessage('csv');
        }
      });
    };
  }
  handleSearchWord(e) {
    this.actionService.searchWord = e.target.value;
    console.log('on search : ' + this.actionService.searchWord);
    this.actionService.sendMessage('search');
  }

  handleAddRow() {
    this.actionService.addrowButton = true;
    this.actionService.sendMessage('addRow');
  }

  handleAddColomn() {
    this.actionService.addColumnButton = true;
    this.actionService.sendMessage('addColumn');
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
  }

  ngOnInit(): void {

  }

  onChangeSearchBar() {
    if (this.searchWord == this.actionService.searchWord) {
      return;
    }
    this.searchWord = this.actionService.searchWord;
    if (!this.searchWord) {
      this.rowDataCopy = [...this.rowDataCopy2];
      return;
    }
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
    if (this.colName == null) {
      return;
    }
    const tempval = [...this.columnDefs];
    const tempCol = {headerName: this.colName, field: this.colName, sortable: true, filter: true, editable: true};
    tempval.push(tempCol);
    this.columnDefs = null;
    this.columnDefs = [...tempval];
    this.actionService.setColumnDefs(this.columnDefs);
  }

  onImportCSV() {
    // console.log(this.actionService.csv);
    this.rowDataCopy2 = [...this.actionService.csv];
    this.rowDataCopy = [...this.actionService.csv];
    this.actionService.setRowData(this.rowDataCopy);

  }

  handdleAutoComplete() {
     // console.log(this.actionService.getDatasource());
    console.log('ashkjhdc');
    this.actionService.searchWord = this.searchString;
    this.onChangeSearchBar();
     // console.log(this.ng2Completer);
  }
}
