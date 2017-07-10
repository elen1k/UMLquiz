import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EasyquizPage } from './easyquiz';

@NgModule({
  declarations: [
    EasyquizPage,
  ],
  imports: [
    IonicPageModule.forChild(EasyquizPage),
  ],
  exports: [
    EasyquizPage
  ]
})
export class EasyquizPageModule {}
