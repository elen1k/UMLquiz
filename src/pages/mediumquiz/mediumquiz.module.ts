import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediumquizPage } from './mediumquiz';

@NgModule({
  declarations: [
    MediumquizPage,
  ],
  imports: [
    IonicPageModule.forChild(MediumquizPage),
  ],
  exports: [
    MediumquizPage
  ]
})
export class MediumquizPageModule {}
