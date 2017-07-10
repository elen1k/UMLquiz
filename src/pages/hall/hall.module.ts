import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HallPage } from './hall';

@NgModule({
  declarations: [
    HallPage,
  ],
  imports: [
    IonicPageModule.forChild(HallPage),
  ],
  exports: [
    HallPage
  ]
})
export class HallPageModule {}
