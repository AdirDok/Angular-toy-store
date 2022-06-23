import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/servises/data.service';
import { MainDataService } from 'src/app/servises/main-data-.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  product


  constructor(
    public _mainData: MainDataService,
    public _data: DataService
  ) { }


  ngOnInit(): void {

  }

  getThisProductDitails() {
    this._mainData.SpecificProduct = this.product
    console.log(this._mainData.SpecificProduct)
    this._mainData.disabelInps = false
  }

  inpValue = 1

  changeInpValue(e) {

    if (e.target.value == 'more') {
      this.inpValue++
    }

    if (e.target.value == 'less') {

      if (this.inpValue != 1) {
        this.inpValue--
      }
    }
  }



  changeInpValueKeyUp(e) {
    if (e.target.value < 1) {
      this.inpValue = 1
    }

  }



  async addToCart() {
    const body = {
      cart_ID: this._mainData.userCartInfo?.cartID,
      Item: this.product.id,
      Quantity: this.inpValue
    }

    this._mainData.addToCart(body)
    this.inpValue = 1

  }




}
