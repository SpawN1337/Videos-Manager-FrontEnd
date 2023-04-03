import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { VideoService } from "../../../services/video.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-watchvideo',
  templateUrl: './watchvideo.component.html',
  styleUrls: ['./watchvideo.component.scss']
})
export class WatchvideoComponent {
  id: any;
  baseUrl = environment.baseUrl;


  constructor(private activatetRoute: ActivatedRoute,private toasterService: ToastrService,private videoService: VideoService
  ) {
  }
  ngOnInit(): void {
    this.id = this.activatetRoute.snapshot.params['id'];
    this.getres()
  }
  getres(){
    this.videoService.getVideo(this.id).subscribe((response: any) => {
      console.log(response)
    }
    ,(error) => {
      if(error.error.message){
      this.toasterService.error( error.error.message,'خطأ', {
        timeOut: 9000,
      });
      console.log("Error",error.error.message);}
    }
    );
  }
}