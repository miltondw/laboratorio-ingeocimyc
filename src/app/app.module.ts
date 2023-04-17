import { NgModule } from '@angular/core';
//Imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
//Material
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
//Pages
import { EnsayosComponent } from './pages/ensayos/ensayos.component';
import { CrearEnsayoComponent } from './pages/crear-ensayo/crear-ensayo.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FormHeaderComponent } from './components/forms/form-header/form-header.component';
import { FormEnsayoDeHumedadComponent } from './components/forms/form-ensayo-de-humedad/form-ensayo-de-humedad.component';
import { FormGranulometriaComponent } from './components/forms/form-granulometria/form-granulometria.component';
import { FormLimiteLiquidoComponent } from './components/forms/form-limite-liquido/form-limite-liquido.component';
import { FormLimitePlasticoComponent } from './components/forms/form-limite-plastico/form-limite-plastico.component';
import { FormFooterComponent } from './components/forms/form-footer/form-footer.component';
import { FormCreateEnsayoComponent } from './components/forms/form-create-ensayo/form-create-ensayo.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { PdfExampleComponent } from './components/pdf-example/pdf-example.component';
import { NgChartsModule } from 'ng2-charts';
import { GraficaLimitesComponent } from './components/grafica-limites/grafica-limites.component';
import { GraficaGranulometriaComponent } from './components/grafica-granulometria/grafica-granulometria.component';

@NgModule({
  declarations: [
    AppComponent,
    EnsayosComponent,
    HeaderComponent,
    FormHeaderComponent,
    FormEnsayoDeHumedadComponent,
    FormGranulometriaComponent,
    FormLimiteLiquidoComponent,
    FormLimitePlasticoComponent,
    FormFooterComponent,
    CrearEnsayoComponent,
    FormCreateEnsayoComponent,
    LayoutComponent,
    NavbarComponent,
    ProyectosComponent,
    ProjectListComponent,
    PdfExampleComponent,
    GraficaLimitesComponent,
    GraficaGranulometriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
