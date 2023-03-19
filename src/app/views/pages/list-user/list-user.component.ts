import { Component, OnInit } from '@angular/core';
import { TableData, UserService } from '../../../services/user.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {

  public filterQuery = '';
  error: any;
  public data: any;
  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.usersService.users().subscribe(
      (data: TableData) => {
        setTimeout(() => {
          this.data = [...data];
        }, 1000);
      }, // success path

      error => this.error = error // error path

    );
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
