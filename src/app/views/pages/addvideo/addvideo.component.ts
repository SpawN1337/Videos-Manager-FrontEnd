import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { ValidationFormsService } from '../../forms/validation-forms/validation-forms.service';
import { Video } from "../../../models/Video";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AirCraftService } from '../../../services/airCraft.service';
@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  form: FormGroup;
  video: Video;
  myAirCrafts: any;
  formErrors: any;
  videoData: string;
  percentDone: any = 0;
  // items: any;

  inputText = 'text';

  constructor(private VideoService: VideoService,
    private toasterService: ToastrService,
    private AirCraftService: AirCraftService,
    // public vf: ValidationFormsService,
    private router: Router,) {
    // this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.allAirCrafts()
    this.form = new FormGroup({
      aircraft: new FormControl(null),
      name: new FormControl(null),
      tags: new FormControl(null),
      video: new FormControl(null),
    });
  }
  get f() { return this.form.controls; }

  
  allAirCrafts() {
    this.AirCraftService.allAirCrafts().subscribe((response: any) => {
      this.myAirCrafts = response
    },
      (error: any) => {
        console.log(error);
      }
    );
  }
  onFileSelect(event: Event) {

    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({ video: file });
    const allowedMimeTypes = ['video/mp4', 'video/mpeg ', 'video/3gpp'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  public onTagEdited(item: any) {
    console.log('tag edited: current value is ' + item);
  }

  onSubmit() {
    let tag = [];
    for (let index = 0 ; index < this.form.value.tags.length ; index++){
      tag.push(this.form.value.tags[index].value)
    }
    this.VideoService.addVideo(this.form.value.name,this.form.value.airCraft, tag, this.form.value.video).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          if (event?.loaded && event?.total) {
            this.percentDone = Math.round(event.loaded / event.total * 100)
          }
          console.log(this.percentDone);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Video successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['users']);
          this.toasterService.success('تمت الإضافة بنجاح');

      }
    })


  }
}
