import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
    //users = null
    // public columnDefs;
    // public rowData;
    rowData = [];
    columnDefs = [
      { headerName: "Resource Name", field: "resourceName" },
      { headerName: "Resource Code", field: "resourceCode" }
  ];
    constructor(private accountService: AccountService) {
        // this.accountService.getAll()
        //     .subscribe(resources => resources.forEach(node => this.rowData.push(node)));
        //     console.log(this.rowData);
    }

    ngOnInit() {
    }
onGridReady(params){
  params.api.setRowData(this.rowData);
  console.log(params);
}




    // deleteUser(id: string) {
    //     const user = this.users.find(x => x.userID === id);
    //     user.isDeleting = true;
    //     this.accountService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => {
    //             this.users = this.users.filter(x => x.userID !== id)
    //         });
    // }
}
