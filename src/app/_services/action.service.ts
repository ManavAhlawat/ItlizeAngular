import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Resource} from '@app/_models/resource';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionService {


  public searchWord: string;
  public addrowButton: boolean;
  public addColumnButton: boolean;
  public csv: any;
  private rowData = [];

  private columnDefs = [
    { headerName: 'Resource Name', field: 'resourceName', sortable: true, filter: true , editable: true, checkboxSelection: true},
    { headerName: 'Resource Code', field: 'resourceCode', sortable: true, filter: true , editable: true}
    ];
  private subject = new Subject<any>();
  constructor(private httpClient: HttpClient) {
    this.getResources().subscribe(e => {
      e.forEach(node => this.rowData.push(node));
    });
  }
  getResources(): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/resources`);

  }

  setRowData(params){
    this.rowData = [...params];
  }

  getRowData(){
    return this.rowData;
  }

  setColumnDefs(params){
    this.columnDefs = [...params];
  }
  getColumnDefs(){
    return this.columnDefs;
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
