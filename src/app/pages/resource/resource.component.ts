import { Component, OnInit, OnChanges } from '@angular/core';
import {AccountService} from '@app/_services';
// declare interface TableData {
//   headerRow: string[];
//   dataRows: string[][];
// }


@Component({
    selector: 'resource-cmp',
    moduleId: module.id,
    templateUrl: 'resource.component.html'
})


export class ResourceComponent implements OnInit, OnChanges{
  dataReady: boolean;
  searchWord: string;
  params: any;
  colName: string;
  rowData = [];
  rowDataCopy = [];
  rowDataCopy2 = [];
  columnDefs = [
    { headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true , editable: true},
    { headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true , editable: true}
  ];
  columnDefsCopy = [];

  constructor(private accountService: AccountService) {
    this.columnDefsCopy = [...this.columnDefs];
    this.accountService.getAll()
      .subscribe(resources => { resources.forEach(node =>
          this.rowData.push(node));
                                this.rowDataCopy = [...this.rowData];
                                this.rowDataCopy2 = [...this.rowData];
        }

      );
    this.dataReady = true;
    // console.log(this.rowData);
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {

  }

  ngOnInit(): void {

  }

  onChangeSearchBar(){
    this.searchWord = localStorage.getItem('searchWord');
    if (!this.searchWord) {
      this.rowDataCopy = [...this.rowDataCopy2];
      return; }
    console.log('click button');
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

  onAddColumn() {
    // this.columnDefsCopy.push();
    // console.log('add col');
    if (this.colName == null) { return; }
    const tempval = [...this.columnDefs];
    const tempCol = { headerName: this.colName, field: this.colName, sortable: true, filter: true , editable: true};
    tempval.push(tempCol);
    this.columnDefs = null;
    this.columnDefs = [...tempval];

  }

  onAddRow() {
    this.dataReady = false;
    // console.log('add row test');
    const tempval2 = {...this.rowData[0]};
    tempval2.resourceCode = null;
    tempval2.resourceName = null;
    this.rowDataCopy.push(tempval2);
    const tempval = [...this.rowDataCopy];
    this.rowDataCopy2 = [...this.rowDataCopy];
    this.rowDataCopy = null;
    this.rowDataCopy = this.rowDataCopy2;
    console.log(this.rowDataCopy);
    this.dataReady = true;

  }

}



// export class ResourceComponent implements OnInit{
//   //example table to see how it would look like
//   public ctx;
//   public chartColor;
//   public tableData1: TableData;
//     ngOnInit(){
//       this.tableData1 = {
//         headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
//         dataRows: [
//           ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
//           ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
//           ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
//           ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
//           ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
//           ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
//         ]
//       };
//     }
// }
