import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonsPage } from './lessons';

@NgModule({
  declarations: [
    LessonsPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonsPage),
  ],
  exports: [
    LessonsPage
  ]
})
export class LessonsPageModule {}
