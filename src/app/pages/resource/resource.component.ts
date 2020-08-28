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
  filterarray: Array<any> = [];
  rowData = [];
  rowDataCopy = [];
  columnDefs = [
    { headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true },
    { headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true }
  ];

  constructor(private accountService: AccountService) {
    this.accountService.getAll()
      .subscribe(resources => { resources.forEach(node =>
          this.rowData.push(node));
                                this.rowDataCopy = [...this.rowData];
        }

      );
    this.dataReady = true;
   // console.log(this.rowData);
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
       if (this.rowDataCopy != null) { this.rowDataCopy = [...this.rowData]; }

    }

  ngOnInit(): void {

  }

  onChangeSearchBar(){
    if (!this.searchWord) {
      this.rowDataCopy = [...this.rowData];
      return; }

    console.log('click button');
    this.dataReady = false;
    this.rowDataCopy = [];
    this.rowData.forEach(e => {
      if (e.resourceName.includes(this.searchWord)) {
        this.rowDataCopy.push(e);
      }
  });
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
