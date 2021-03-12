import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from '../app/components/pagina-principal/pagina-principal.component';
import { AnagramaComponent } from '../app/components/anagrama/anagrama.component';
import { CuboMagicoComponent } from '../app/components/cubo-magico/cubo-magico.component';
import { DivisionComponent } from '../app/components/division/division.component';
import { MultiplicacionComponent } from '../app/components/multiplicacion/multiplicacion.component';
import { PangramaComponent } from '../app/components/pangrama/pangrama.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: PaginaPrincipalComponent },
  { path: 'anagrama', component: AnagramaComponent },
  { path: 'cubo-magico', component: CuboMagicoComponent },
  { path: 'division', component: DivisionComponent },
  { path: 'multiplicacion', component: MultiplicacionComponent },
  { path: 'pangrama', component: PangramaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
