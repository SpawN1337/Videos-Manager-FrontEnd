import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
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
  searchText = '';
  items: any;
  title: 'pagination'
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private router :Router,private videoService: VideoService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.datalist();
  }

  datalist():void{
    this.videoService.allVideos().subscribe(
      (res) => {
        this.items = res
        console.log("rataa",this.items.videos
        )
        this.items =this.items.videos
        return this.items
      },
    );

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

  watch(item:any) {
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

}
