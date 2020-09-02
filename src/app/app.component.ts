import {Component, ViewChild} from '@angular/core';

import {AccountService} from './_services';
import {User} from './_models';
import {Papa} from 'ngx-papaparse';
import {NgxSpinnerService} from 'ngx-spinner';
import {AgGridAngular} from 'ag-grid-angular';
import {ActionService} from '@app/_services/action.service';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent {
  user: User;
  private csvRecords: any[];
  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor(private accountService: AccountService, private papa: Papa, private spinner: NgxSpinnerService,
              private actionService: ActionService) {
    this.accountService.user.subscribe(x => this.user = x);
    const csvData = '"Hello","World!"';
    this.papa.parse(csvData, {
      complete: (result) => {
        console.log('Parsed: ', result);
      }
    });
  }

  logout() {
    this.accountService.logout();
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
}
