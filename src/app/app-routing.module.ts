import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnsayosComponent } from './pages/ensayos/ensayos.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'laboratorio',
    pathMatch:'full'
  },
  {
    path:'laboratorio',
    component:EnsayosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
