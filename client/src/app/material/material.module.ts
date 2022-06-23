import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';





// קומפוננטות להוסיף לכאן 
const materialComponents =[
  MatSliderModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatStepperModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule
  
]

@NgModule({

  imports: [materialComponents],
    

  exports:[materialComponents]


  
})
export class MaterialModule { }
