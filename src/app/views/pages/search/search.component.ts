import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VideoService } from "../../../services/video.service";
import { AirCraftService } from '../../../services/airCraft.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public daterange: any = {};
  myAirCrafts: any;
  public items: any;
  constructor(private AirCraftService: AirCraftService,private router: Router, private videoService: VideoService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.allAirCrafts()
    this.videoService.getVideos();
    this.videoService.allVideos().subscribe(
      (res) => {
        this.items = res
        
        this.items = this.items.videos
        return this.items
      },
    );
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
    // Converts the route into a string that can be used 
    // with the window.open() function
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
