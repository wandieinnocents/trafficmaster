import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentsPage } from './incidents';

@NgModule({
  declarations: [
    IncidentsPage,
  ],
  imports: [
    IonicPageModule.forChild(IncidentsPage),
  ],
})
export class IncidentsPageModule {}
