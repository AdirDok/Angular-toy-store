import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servises/data.service';
import { MainDataService } from 'src/app/servises/main-data-.service';
import user_T_model from 'src/app/T_Models/user_T_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public _data: DataService,
    public _mainData: MainDataService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    this._data.checkIfLoginOrNot()
    this._data.imInMain = false
    this._mainData.getCartData()
    this.myUser = this._data.myUser
  }

  backToMainPage() {
    // this._r.navigateByUrl('/')   /*  אני רוצה לטעון מחדש את העמוד כולו כי אם לא הוא לא מרענן את הנתונים החדשים */
    this._data.logout()
  }



  myUser: user_T_model

  today = new Date().toISOString().split("T")[0]

  href: string = `http://localhost:1000/orders/toDownlod/`

  changeInpValue(e) {
    this._mainData.sherchInCartInpValue = e.target.value
  }

  city: string = ""
  street: string = ""

  setInpsValus() {
    this.city = this.myUser.city
    this.street = this.myUser.street
  }

}
