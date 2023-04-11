import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../../services/place.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent {


  searchText = '';
  error: any;
  data: any;
  title: 'pagination'
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private toasterService: ToastrService,private PlaceService: PlaceService) { }

  ngOnInit(): void {
    this.datalist()
  }

  datalist(): void {
    this.PlaceService.allPlaces().subscribe((response) => {
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
      this.PlaceService.removePlace(id).subscribe((response) => {
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


