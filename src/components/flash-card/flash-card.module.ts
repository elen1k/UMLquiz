import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card';

@NgModule({
  declarations: [
    FlashCardComponent,
  ],
  exports: [
    FlashCardComponent
  ]
})
export class FlashCardComponentModule {}
