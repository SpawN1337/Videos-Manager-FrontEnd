import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Shared Module


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';

import { NullPipe } from '../pipes/null.pipe';


@NgModule({
  declarations: [
  
    NullPipe,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
    
  ],
  exports:[
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NullPipe,
  
  ]
})
export class SharedModule1 { }