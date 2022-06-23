import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './comps/login/login.component';
import { RegisterComponent } from './comps/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './comps/main/main.component';
import { CartComponent } from './comps/cart/cart.component';
import { ListComponent } from './comps/list/list.component';
import { ItemComponent } from './comps/item/item.component';
import { OrderComponent } from './comps/order/order.component';
import { AdminComponent } from './comps/admin/admin.component';
import { MarkCodePipe } from './pipes/mark-code.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CartComponent,
    ListComponent,
    ItemComponent,
    OrderComponent,
    AdminComponent,
    MarkCodePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
