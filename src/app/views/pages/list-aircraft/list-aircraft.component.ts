import { Component, OnInit } from '@angular/core';
import { AirCraftService } from '../../../services/airCraft.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-aircraft',
  templateUrl: './list-aircraft.component.html',
  styleUrls: ['./list-aircraft.component.scss']
})
export class ListAircraftComponent {

  searchText = '';
  error: any;
  data: any;
  title: 'pagination'
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private toasterService: ToastrService,private airCraftService: AirCraftService) { }

  ngOnInit(): void {
    this.datalist()
  }

  datalist(): void {
    this.airCraftService.allAirCrafts().subscribe((response) => {
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
      this.airCraftService.removeAirCraft(id).subscribe((response) => {
        this.toasterService.info( 'تمت عملية الحذف بنجاح');
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
          this.toasterService.error( error.error.message,'خطأ');

        }
      );
    }
  }
}

