import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-watchvideo',
  templateUrl: './watchvideo.component.html',
  styleUrls: ['./watchvideo.component.scss']
})
export class WatchvideoComponent {
  id: any;



  constructor(private activatetRoute: ActivatedRoute,
    ) {
  }
  ngOnInit(): void {
  this.id = this.activatetRoute.snapshot.params['id'];
}

}