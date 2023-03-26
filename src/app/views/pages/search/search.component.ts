import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  form: FormGroup;
  result: FormGroup;
  constructor(private AirCraftService: AirCraftService,private router: Router, private videoService: VideoService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.allAirCrafts()
    this.form = new FormGroup({
      words: new FormControl(null),
      aircraft: new FormControl(null),
      place: new FormControl<Date | null>(null),
      start: new FormControl<Date | null>(null),
      end: new FormControl(null),
    });
    this.videoService.allVideos().subscribe(
      (res) => {
        this.items = res
        
        this.items = this.items.videos
        return this.items
      },
    );
  }
  search() {
    
    if (this.form.value.words == ''){
      this.form.value.words = null
    };
    if (this.form.value.place == ''){
      this.form.value.place = null
    };
    if (this.form.value.start == ''){
      this.form.value.start = null
    };
    if (this.form.value.end == ''){
      this.form.value.end = null
    };
    console.log('clicked')
    const addowner = this.videoService.search(this.form.value).subscribe((response: any) => {
    },
      (error: any) => {
        console.log(error);
      }
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
