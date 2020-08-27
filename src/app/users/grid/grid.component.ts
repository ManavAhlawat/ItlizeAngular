import {Component, OnChanges, OnInit} from '@angular/core';
import {AccountService} from '@app/_services';
import {IEventEmitter} from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {
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
