import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { ValidationFormsService } from '../../forms/validation-forms/validation-forms.service';
import { Image } from "../../../models/Image";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  form: FormGroup;
  image: Image;
  formErrors: any;
  imageData: string;
  percentDone: any = 0;

  constructor(private imageService: ImageService,
    private toasterService: ToastrService,
    // public vf: ValidationFormsService,
    private router: Router,) { 
      // this.formErrors = this.vf.errorMessages;
     }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }
  get f() { return this.form.controls; }

  onFileSelect(event: Event) {
   
    const file = (event.target as HTMLInputElement)?.files?.[0] ;
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ['video/mp4', 'video/mpeg ', 'video/3gpp'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageService.addImage(this.form.value.name, this.form.value.image).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          if(event?.loaded && event?.total ) {
            this.percentDone = Math.round(event.loaded / event.total * 100)
          }
          console.log( this.percentDone);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Image successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['users']);
          this.toasterService.success('تمت الإضافة بنجاح');
          
        }
    })


  }
}
