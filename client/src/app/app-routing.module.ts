import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './comps/admin/admin.component';
import { LoginComponent } from './comps/login/login.component';
import { MainComponent } from './comps/main/main.component';
import { OrderComponent } from './comps/order/order.component';
import { RegisterComponent } from './comps/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
