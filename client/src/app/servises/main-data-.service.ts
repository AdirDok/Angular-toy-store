import { Injectable } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { __assign } from 'tslib';
import cartItem_T_model from '../T_Models/cartItem_T_model';
import categories_T_models from '../T_Models/categories_T_models';
import order_T_model from '../T_Models/order_T_model';
import product_T_model from '../T_Models/product_T_model';
import userCart_T_model from '../T_Models/userCart_T_model';


@Injectable({
  providedIn: 'root'
})
export class MainDataService {

  constructor(

  ) { }

  userCartInfo: userCart_T_model;

  cartItems: cartItem_T_model[] = []        /*   מערך של המוצרים שישי לי בעגלה בלבד */

  productsArr: product_T_model[] = []    /* מערך של כל המוצרים שלי */

  categoriesArr: categories_T_models[] = []

  isCartOpen: boolean = true

  SpecificProduct: product_T_model = {
    id: '',
    product_Name: '',
    price: '',
    Image: '',
    category: ''

  }


  toggleCart() {
    this.isCartOpen = !this.isCartOpen
  }

  // ================================================

  async getCartData() {

    const res = await fetch(`http://localhost:1000/usersCart`, {
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json()

    if (!data) {
      console.log("no items in cart")
      return
      //   אולי תהייה לי פב בעייה כשהמשתמש חדש ואין לו כלום בעגלה
    }

    const [cartItems, userCartInfo] = data
    this.cartItems = cartItems
    this.userCartInfo = userCartInfo

  }   /*  של getCartData */

  // ===============================


  async deleteItemFromCart(productID) {
    const res = await fetch(`http://localhost:1000/usersCart/product/` + productID, {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json()

    if (data.msg) {
      this.getCartData()
    }
  }



  async emptyCart() {
    const res = await fetch(`http://localhost:1000/userscart/cart`, {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()

    if (data.msg) {
      this.getCartData()
    }

  }



  async getAllProducts() {   /*  מביא את כל המוצרים וממלא את המערך שלמעלה  */

    const res = await fetch(`http://localhost:1000/products/allproducts`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()
    this.productsArr = data
  }


  async getAllCategories() {    /*   מביא את כל הקטגוריות */

    const res = await fetch(`http://localhost:1000/products/allCategories`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()

    this.categoriesArr = []
    for (let i = 0; i < 4; i++) {
      this.categoriesArr.push(data[i])
    }
  }


  async AllProductsPer_Category(categoryName) {   /*  מביא את כל המוצרים תחת קטגורייה ספציפית */
    const res = await fetch(`http://localhost:1000/products/category/${categoryName}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'

    })

    const data = await res.json()
    this.productsArr = data
    console.log(this.productsArr)


  }


  async get_SpecificProduct(productID) {
    const res = await fetch(`http://localhost:1000/products/product/${productID}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()
    this.SpecificProduct = data
  }


  async Main_Search(productName) {    /*  מביא את כל המוצרים לפי שורת חיפוש */

    const res = await fetch(`http://localhost:1000/products/Search?p=${productName}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'

    })

    const data = await res.json()

    if (data.msg) {
      console.log("no product find")

    } else {
      this.productsArr = data
    }
  }


  addToCart_Errs: string;

  async addToCart(body) {

    const res = await fetch(`http://localhost:1000/usersCart`, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (data.err) {
      console.log(data.err)
      this.addToCart_Errs = data.err
      return
    }

    if (data.msg) {
      this.getCartData()
    }


  }

  unValidDates = []

  async getUnvalidDates() {

    const res = await fetch(`http://localhost:1000/orders/dates`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()

    this.unValidDates = data

  }


  sherchInCartInpValue: string = ''

  // ==================================מפלטר את הפריטים שבעגלה אולי אני ישתמש אחר כך ===========


  filterCartItems() {

    if (this.sherchInCartInpValue == '') {
      this.getCartData()
      return
    }

    const lowerCaseValue = this.sherchInCartInpValue.toLocaleLowerCase()
    const UpperCase = this.sherchInCartInpValue.toUpperCase()
    const results = []

    for (const i of this.cartItems) {
      if (i.product_Name[0].includes(lowerCaseValue) || i.product_Name[0].includes(UpperCase)) {

        i.product_Name = `<mark>${i.product_Name}</mark>`

        console.log(lowerCaseValue, UpperCase)
        results.push(i)
      }
    }
    this.cartItems = results

    return console.log(results)
  }



  // ==============================Orders And Downlodes ==============================================

  openDownlodPopup: boolean = false
  order_FormErrs: string = ''
  userOrderDitails: order_T_model;
  fileName: string;
  directory: string;

  async sendOrderToStore(body) {
    const res = await fetch(`http://localhost:1000/orders`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (data.err_msg) {
      this.order_FormErrs = data.err_msg
      console.log(this.order_FormErrs)
      return
    }

    if (data.msg) {
      this.openDownlodPopup = true
      this.userOrderDitails = data.order
      this.popup = true
      this.fileName = data.fileName + '.txt'
      console.log(this.fileName)
      this.directory = data.directoryToMyDadFolder
      console.log(this.directory)
    }


  }


  async downlodeResp(fileName) {

    const res = await fetch(`http://localhost:1000/orders/toDownlod/` + fileName, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })
    const data = await res.json()
  }




  // =========================== Popups =========================================
  popup: boolean = false
  openOrClosePopup() {
    this.popup = !this.popup
  }


  // ===============================ADmin===================

  async deleteProductFromServerAdmin(productID) {

    const res = await fetch(`http://localhost:1000/admin/` + productID, {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    })

    const data = await res.json()

    if (data.err) {
      console.log(data.err)
      return
    }

    if (data.msg) {
      this.getAllProducts()
    }

  }

  uppdateProductInfo_Errors: string = ''

  async uppdateProductInfo(body) {

    const res = await fetch(`http://localhost:1000/admin/` + body.id, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    const data = await res.json()
    console.log(data)

    if (data.err) {
      this.uppdateProductInfo_Errors = data.err
      return
    }

    if (data.msg) {
      this.getAllProducts()
    }


  }


  addNewProduct_Errors: string = ''

  async addNewProduct(body: product_T_model) {

    const res = await fetch(`http://localhost:1000/admin`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    const data = await res.json()
    console.log(data)

    if (data.err) {
      this.addNewProduct_Errors = data.err
      return
    }


    if (data.msg) {
      this.getAllProducts()
      this.openOrClosePopup()
    }

  }

  disabelInps: boolean = true






}
