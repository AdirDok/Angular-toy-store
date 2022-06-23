import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/servises/data.service';
import { MainDataService } from 'src/app/servises/main-data-.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public _data: DataService,
    public _mainData: MainDataService
  ) { }


  ngOnInit(): void {

    this._data.checkIfLoginOrNot()
    this._mainData.getAllProducts()
    this._mainData.getAllCategories()
    this._data.imInMain = true
  }

  p = this._mainData.SpecificProduct

  qq(editProductForm) {
    console.log(editProductForm)
  }

  itemD = {
    id: this._mainData.SpecificProduct?.id,
    product_Name: this._mainData.SpecificProduct?.product_Name

  }

}
