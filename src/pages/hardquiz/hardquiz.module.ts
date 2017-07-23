import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HardquizPage } from './hardquiz';
import { FlashCardComponentModule } from '../../components/flash-card/flash-card.module';


@NgModule({
  declarations: [
    HardquizPage,
  ],
  imports: [
    FlashCardComponentModule,
    IonicPageModule.forChild(HardquizPage),
  ],
  exports: [
    HardquizPage
  ]
})
export class HardquizPageModule {}
