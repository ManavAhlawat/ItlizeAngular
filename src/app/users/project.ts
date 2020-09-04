import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionService} from '@app/_services/action.service';
import {AgGridAngular} from 'ag-grid-angular';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({templateUrl: 'project.html', styleUrls: ['./project.css']})

export class Project implements OnInit{
  projects = null
  rowData: any[];
  rowData2: any[];
  columnDefs: any[];

  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('agGrid2') agGrid2: AgGridAngular;
  constructor(public actionService: ActionService, private accountService: AccountService ) {
    this.rowData = [...this.actionService.getRowData()];
    this.rowData2 =[];
    this.columnDefs = [...this.actionService.getColumnDefs()];

  }
  ngOnInit(){
    // console.log(this.rowData);
    // console.log(this.columnDefs);
    this.accountService.getProjects()
            .pipe(first())
            .subscribe(projects => this.projects = projects);
            console.log(this.projects);
  }

  handleOnSubmit() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    this.rowData2 = selectedData;
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    // console.log(selectedNodes);
    // console.log(selectedData);
    // console.log(selectedDataStringPresentation);
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    this.rowData2 = selectedData;
  }
  handelSelectAll(){
    this.agGrid.api.selectAll();
  }
  handleSelectAll2(){
    this.agGrid2.api.selectAll();
  }
  handleClearAll(){
    this.agGrid.api.deselectAll();
  }
  handleDelete(){
    this.agGrid2.api.getSelectedNodes()
    this.agGrid2.api.removeItems(this.agGrid2.api.getSelectedNodes());
  }

}
