import { Component, OnInit } from '@angular/core';
import { TableData, UserService } from '../../../services/user.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {
  searchText = '';
  error: any;
  data: any;
  title: 'pagination'
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.datalist()
  }

  datalist(): void {
    this.usersService.users().subscribe((response) => {
      this.data = response
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.datalist();

  }
  onTableSizChange(event: any):void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.datalist();

  }

  onDelete(id: number) {
    var result = confirm("هل تريد القيام بعملية الحذف ؟");
    if (result == true) {
      this.usersService.removeuser(id).subscribe((response) => {
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
