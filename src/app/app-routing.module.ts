import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnsayosComponent } from './pages/ensayos/ensayos.component';
import { CrearEnsayoComponent } from './pages/crear-ensayo/crear-ensayo.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'',
        redirectTo:'laboratorio/crear-ensayo',
        pathMatch:'full'
      },
       {
        path:'laboratorio/proyectos',
        component:ProyectosComponent
      },
      {
        path:'laboratorio/crear-ensayo',
        component:CrearEnsayoComponent
      },
      {
        path:'laboratorio/ensayo/:id',
        component:EnsayosComponent
      }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
