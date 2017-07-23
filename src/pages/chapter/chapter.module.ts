import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChapterPage } from './chapter';
import { FlashCardComponentModule } from '../../components/flash-card/flash-card.module';

@NgModule({
  declarations: [
    ChapterPage,
  ],
  imports: [
    FlashCardComponentModule,
    IonicPageModule.forChild(ChapterPage),
  ],
  exports: [
    ChapterPage
  ]
})
export class ChapterPageModule {}
