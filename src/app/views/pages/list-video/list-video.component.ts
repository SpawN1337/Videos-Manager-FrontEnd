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
  // videos: Video[] = [];
  private imageSubscription: Subscription;
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
    // this.imageSubscription = this.videoService
    //   .getImagesStream()
    //   .subscribe((images: Image[]) => {
    //     this.images = images;
    //   });
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
    this.imageSubscription.unsubscribe();
  }

}
