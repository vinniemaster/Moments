import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { EditMomentComponent } from './components/edit-moment/edit-moment.component';
import { HomerComponent } from './components/homer/homer.component';
import { MomentComponent } from './components/moment/moment.component';
import { NewMomentComponent } from './components/new-moment/new-moment.component';
import { SetupComponent } from './components/setup/setup.component';


const routes: Routes = [
  {path:'', component: HomerComponent},
  {path:'new-moment', component: NewMomentComponent},
  {path:'about', component: AboutComponent},
  {path:'setup', component: SetupComponent},
  {path:'moments/:id', component: MomentComponent},
  {path:'moments/edit/:id', component: EditMomentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
