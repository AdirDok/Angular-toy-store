import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import user_T_model from '../T_Models/user_T_model';
import { MainDataService } from './main-data-.service';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    public _r: Router,
    public _mainData: MainDataService
  ) { }


  loginOrNot: boolean = false                 /*  האם הוא לוגאין אוו לא */
  myUser: user_T_model              /* היוזר/משתמש שלי   */
  loginErrors: string = ''                   /* הודעות שגיאה שחוזרות מהלוגאין */
  cartInfo: any;                    /*  מיידע על העגלה של המשתמש לי */



  async login(body) {

    const res = await fetch(`http://localhost:1000/usersLog/login`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)

    })

    const data = await res.json()

    if (data.err_msg) {
      this.loginErrors = data.err_msg
      return
    }

    if (data.msg_Admin) {
      this.myUser = data['user']
      localStorage['user'] = JSON.stringify(this.myUser)
      return
    }

    this.loginErrors = ''

    const [userData, cartInfo] = data

    this.myUser = userData
    this.cartInfo = cartInfo

    localStorage['cartInfo'] = JSON.stringify(this.cartInfo)
    console.log(cartInfo)
    localStorage['user'] = JSON.stringify(this.myUser)
    this.R_justregistert = false
    
  }   /*  של לוגאין */


  async logout() {
    const res = await fetch(`http://localhost:1000/usersLog/logout`, {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json()

    if (data['msg']) {
      this.myUser = null
      this.cartInfo = null
      this.loginOrNot = false
      localStorage.clear()
      this._r.navigateByUrl('/')
      this.imInMain = false
    }
  }           /*  של לוגאווט */

  // ==================================
  // בןדק מיידע מה LS

  checkIfLoginOrNot() {

    const isUserLogin = localStorage.getItem('user')

    if (!isUserLogin) {
      this._r.navigateByUrl('/')
      return console.log("user is not login")
    }

    this.myUser = JSON.parse(localStorage['user'])

    if (this.myUser.Admin == false) {

      this.cartInfo = JSON.parse(localStorage['cartInfo'])
    }


  }


  // ==================================

  R_justregistert: boolean = false
  R_registerErrors: string = ''


  async R_register(body) {

    const res = await fetch(`http://localhost:1000/usersLog/register`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (data.err_msg) {
      this.R_registerErrors = data.err_msg
      return
    }

    if (data.err_N) {
      this.R_registerErrors = ''
      return
    }

    if (data.msg) {
      this.R_justregistert = true
    }

    console.log('im  from R_register func ', data)
    this._r.navigateByUrl('/')

  }

  imInMain: boolean = false


  async redirectToMain() {   /* זה ירוץ בטעינת main */
    if (this.myUser.Admin == false) {
      this._mainData.getCartData()
      this.imInMain = true   /*  כלומר הוא יציג את השורת חיפוש */
      this._r.navigateByUrl('/main')
    } else {
      // =================== פה אני יכניס בקשה לשרת לוודא שהמשתמש אכן אדמין =====================
      this._r.navigateByUrl('/admin')
    }
  }

}
