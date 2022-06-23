import { Component, OnInit } from '@angular/core';
import { MainDataService } from 'src/app/servises/main-data-.service';
import cartItem_T_model from 'src/app/T_Models/cartItem_T_model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public _mainData: MainDataService
  ) { }

  ngOnInit(): void {

  }


}
