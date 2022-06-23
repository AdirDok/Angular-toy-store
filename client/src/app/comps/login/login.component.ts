import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servises/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _data: DataService

  ) { }



  ngOnInit(): void {

    this.getGeneralInfo()
    this.changeBtnValue()
    console.log(this._data.cartInfo?.['cart']?.['Paid_Date'])
    
  }
  // =============== אתחול של מאפיינים============

  generalInfo = {}

  myData = {
    ID: '',
    password: ''
  }

  btnValue: string;
  cartInfo = this._data.cartInfo

  // ============ פונקציות ================

  async getGeneralInfo() {     /*   מביא מיידע כללי אודות האתר  */
    const res = await fetch(`http://localhost:1000/info`)
    const data = await res.json()
    // console.log(data)
    this.generalInfo = data

  }



  changeBtnValue() {

    if (this._data.myUser?.Admin == true) {
      this.btnValue = "Hi Admin " + this._data.myUser.F_name
    }

    if (this.cartInfo?.['cart msg'].msg == 'open cart') {
      this.btnValue = "Continue buying"

    } else if (this.cartInfo?.['cart msg'].msg == 'new user') {
      this.btnValue = "Welcome to your first purchase"
    } else if (this.cartInfo?.['cart msg'].msg == 'old user') {
      this.btnValue = "start buying"
    }
  }

  async login(body) {

    await this._data.login(body)

    if (this._data.cartInfo && this._data.loginErrors == '') {

      this.cartInfo = this._data.cartInfo
      this.changeBtnValue()
    } else {
      this.changeBtnValue()
    }

  }



}
