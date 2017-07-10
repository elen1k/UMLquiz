import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HardquizPage } from './hardquiz';

@NgModule({
  declarations: [
    HardquizPage,
  ],
  imports: [
    IonicPageModule.forChild(HardquizPage),
  ],
  exports: [
    HardquizPage
  ]
})
export class HardquizPageModule {}
