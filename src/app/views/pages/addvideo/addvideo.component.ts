import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationService } from '../../../validators/validation.service';
import { Video } from "../../../models/Video";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AirCraftService } from '../../../services/airCraft.service';
import { PlaceService } from '../../../services/place.service';
@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  form: FormGroup;
  video: Video;
  public fileSize: string;
  myAirCrafts: any;
  myDisks: any;
  myplaces: any;
  formErrors: any;
  videoData: string;
  percentDone: any = 0;
  inputText = 'text';
  submitted = false;
  constructor(private VideoService: VideoService,
    private toasterService: ToastrService,
    private AirCraftService: AirCraftService,
    private PlaceService: PlaceService,
    public vf: ValidationService,
    private router: Router,) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.allAirCrafts()
    this.alldisks()
    this.allPlacess()
    this.form = new FormGroup({
      aircraft: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      video: new FormControl('', [Validators.required]),
      disk: new FormControl('', [Validators.required]),
      accept: new FormControl(false, Validators.requiredTrue)
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
  allPlacess() {
    this.PlaceService.allPlaces().subscribe((response: any) => {
      this.myplaces = response
    },
      (error: any) => {
        console.log(error);
      }
    );
  }
  alldisks() {
    this.VideoService.disks().subscribe((response: any) => {
      this.myDisks = response
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
      const fileSizeInBytes = file.size;
      const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024 );
      this.fileSize = fileSizeInGB.toFixed(3) + ' GB';
      console.log('Selected file size: ' + fileSizeInGB.toFixed(3) + ' GB'); // Display the size of the selected file in GB
      console.log('Selected file size: ' + fileSizeInMB.toFixed(3) + ' MB'); // Display the size of the selected file in GB
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
    this.submitted = true;
    if (this.form.invalid) {
      return
    };
    let tag = [];
    if (this.form.value.tags) {
      for (let index = 0; index < this.form.value.tags.length; index++) {
        tag.push(this.form.value.tags[index].value)
      }
    }
    this.VideoService.addVideo(this.form.value.name, this.form.value.aircraft, this.form.value.place, this.form.value.date,this.form.value.disk, tag, this.form.value.video).subscribe((event: HttpEvent<any>) => {
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
          this.router.navigate(['videos']);
          this.toasterService.success('تمت الإضافة بنجاح',);

      }
    },
    (error: any) => {
      this.toasterService.error(error.error.message, 'خطأ');
      console.log(error);
    })
  }
  
  onReset() {

    this.submitted = false;
    this.form.reset();

  }
}
