import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallLogComponent } from './call-log/call-log.component';

const routes: Routes = [ 
  {path: '', component: CallLogComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
