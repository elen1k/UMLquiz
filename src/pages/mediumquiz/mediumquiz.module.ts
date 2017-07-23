import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediumquizPage } from './mediumquiz';
import { FlashCardComponentModule } from '../../components/flash-card/flash-card.module';


@NgModule({
  declarations: [
    MediumquizPage,
  ],
  imports: [
    FlashCardComponentModule,
    IonicPageModule.forChild(MediumquizPage),
  ],
  exports: [
    MediumquizPage
  ]
})
export class MediumquizPageModule {}
