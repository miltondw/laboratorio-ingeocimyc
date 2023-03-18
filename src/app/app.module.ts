import { NgModule } from '@angular/core';
//Imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
//Material
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
//Pages
import { EnsayosComponent } from './pages/ensayos/ensayos.component';
//Components
import { HeaderComponent } from './components/header/header.component';
import { FormHeaderComponent } from './components/forms/form-header/form-header.component';
import { FormEnsayoDeHumedadComponent } from './components/forms/form-ensayo-de-humedad/form-ensayo-de-humedad.component';
import { FormGranulometriaComponent } from './components/forms/form-granulometria/form-granulometria.component';
import { FormLimiteLiquidoComponent } from './components/forms/form-limite-liquido/form-limite-liquido.component';
import { FormLimitePlasticoComponent } from './components/forms/form-limite-plastico/form-limite-plastico.component';
import { FormFooterComponent } from './components/forms/form-footer/form-footer.component';

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
    FormFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
