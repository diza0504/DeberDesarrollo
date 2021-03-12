import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PangramaComponent } from './components/pangrama/pangrama.component';
import { DivisionComponent } from './components/division/division.component';
import { MultiplicacionComponent } from './components/multiplicacion/multiplicacion.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { CuboMagicoComponent } from './components/cubo-magico/cubo-magico.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    PaginaPrincipalComponent,
    PangramaComponent,
    DivisionComponent,
    MultiplicacionComponent,
    AnagramaComponent,
    CuboMagicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
