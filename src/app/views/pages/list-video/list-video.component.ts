import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { VideoService } from "../../../services/video.service";
import { Video } from "../../../models/Video";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.scss']
})
export class ListVideoComponent {
  selectedDate: string;
  searchText = '';
  items: any;
  currentDate: any
  title: 'pagination'
  page: number = 1;
  count: number = 0;
  dateForm: FormGroup;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(

    private router: Router, private videoService: VideoService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.dateForm = new FormGroup({
      date: new FormControl(today)
    });
    this.datalist();
  }
  onLeftArrowClick() {
    const current = new Date(this.dateForm.value.date);
    const newDate = new Date(current);
    newDate.setDate(current.getDate() - 1);
    this.dateForm.patchValue({
      date: newDate.toISOString().slice(0, 10)
    });
  }
  id = JSON.parse(atob((localStorage.getItem('token') || '{}').split('.')[1])).role
  add() {
    if (this.id == 'admin' ||  this.id =='operator') { return true } else return false
  }

  onRightArrowClick() {
    const current = new Date(this.dateForm.value.date);
    const newDate = new Date(current);
    newDate.setDate(current.getDate() + 1);
    this.dateForm.patchValue({
      date: newDate.toISOString().slice(0, 10)
    });
  }
  datalist(): void {
    this.videoService.dayVideos(this.dateForm.value).subscribe(
      (res) => {
        this.items = res
        this.items = this.items.videos
        return this.items
      },
    );

  }

  onTableDataChange(event: any) {
    this.page = event;
    this.datalist();

  }

  onTableSizChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.datalist();

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
  ngOnDestroy() {
    // this.imageSubscription.unsubscribe();
  }
  //date


}
