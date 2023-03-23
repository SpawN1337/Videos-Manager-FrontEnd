import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { VideoService } from "../../../services/video.service";
import { Video } from "../../../models/Video";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.scss']
})
export class ListVideoComponent {
  public items: any;
  constructor(private videoService: VideoService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.videoService.getVideos();
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
