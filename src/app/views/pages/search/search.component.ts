import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VideoService } from "../../../services/video.service";
import { AirCraftService } from '../../../services/airCraft.service';
import * as moment from 'moment';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public daterange: any = {};
  public myAirCrafts: any;
  public items: any;
  form: FormGroup;
  public result: any;

  title: 'pagination'
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private AirCraftService: AirCraftService, private router: Router, private videoService: VideoService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.allAirCrafts()
    this.form = new FormGroup({
      words: new FormControl(null),
      aircraft: new FormControl(null),
      place: new FormControl<Date | null>(null),
      start: new FormControl<Date | null>(null),
      end: new FormControl(null),
    });
  }
  search() {
    // if system is GMT+0100
    if (this.form.value.end) {
      this.form.value.end=moment(this.form.value.end).utcOffset(0, true).format();
    };
    if (this.form.value.start) {
      this.form.value.start=moment(this.form.value.start).utcOffset(0, true).format();
    };
    // end if system is GMT+0100
    if (this.form.value.words == '') {
      this.form.value.words = null
    };
    if (this.form.value.place == '') {
      this.form.value.place = null
    };
    if (this.form.value.start == '') {
      this.form.value.start = null
    };
    if (this.form.value.end == '') {
      this.form.value.end = null
    };

    console.log("by default:",  moment(this.form.value.end).utcOffset(0, true).format() );
    const search = this.videoService.search(this.form.value).subscribe((response: any) => {
      this.result = response.videos
      console.log('clicked', this.result)
    },
      (error: any) => {
        console.log(error);
      }
    );
  }


  

  onTableDataChange(event: any) {
    this.page = event;
    this.search();

  }

  onTableSizChange(event: any):void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.search();

  }

  allAirCrafts() {
    this.AirCraftService.allAirCrafts().subscribe((response: any) => {
      this.myAirCrafts = response
    },
      (error: any) => {
        console.log(error);
      }
    );
  }
  watch(item: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/watch/${item}`])
    );

    window.open(url, '_blank');
  }
  onDelete(id: number) {
    var result = confirm("هل تريد القيام بعملية الحذف ؟");
    if (result == true) {
      this.videoService.removeVideo(id).subscribe((response) => {
        this.ngOnInit();
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
