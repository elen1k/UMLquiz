import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EasyquizPage } from './easyquiz';
import { FlashCardComponentModule } from '../../components/flash-card/flash-card.module';

@NgModule({
  declarations: [
    EasyquizPage,
  ],
  imports: [
    FlashCardComponentModule,
    IonicPageModule.forChild(EasyquizPage),
  ],
  exports: [
    EasyquizPage
  ]
})
export class EasyquizPageModule {}
