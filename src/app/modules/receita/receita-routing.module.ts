import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitaComponent } from './receita.component';

const receitaRoute: Routes = [
  { path: '', component: ReceitaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(receitaRoute)],
  exports: [RouterModule]
})
export class ReceitaRoutingModule { }

