import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servises/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _data: DataService,
    public _fb: FormBuilder,
    public _r: Router

  ) { }

  ngOnInit(): void {

    // this._data.checkIfLoginOrNot()   /* זה רק כדי שהייה לי מוח לכבוד להוריד מהערה כשאני מסיים עםההרשמה  */
  }

  IDAlredyInUse: boolean = false

  async isIdAlredyInUse(value) {

    const ID = { "ID": value }

    if (value) {
      const res = await fetch(`http://localhost:1000/usersLog/doesIdExist`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(ID)
      })

      const data = await res.json()
      console.log(data, ID)
      this.IDAlredyInUse = data

    }
  }

  rediract() {
    this._r.navigateByUrl('/')
    console.log("I'm re-navigating")
  }

  RegistrationForm: FormGroup = this._fb.group({

    ID: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],

    Email: ['', [
      Validators.required,
      Validators.email

    ]],

    password: ['', [
      Validators.required
    ]],

    confirmPassword: ['', [
      Validators.required,

    ]],
    
    F_name: ['', [
      Validators.required
    ]],

    L_name: ['', [
      Validators.required
    ]],

    city: ['', [
      Validators.required
    ]],

    street: ['', [
      Validators.required
    ]],


  }, { validator: this.passwordValidator })


  // ===============אתחול של=FC==============

  ID_Fc = this.RegistrationForm.get('ID')
  Email_Fc = this.RegistrationForm.get('Email')
  password_Fc = this.RegistrationForm.get('password')
  confirmPassword_Fc = this.RegistrationForm.get('confirmPassword')
  F_name_Fc = this.RegistrationForm.get('F_name')
  L_name_Fc = this.RegistrationForm.get('L_name')
  city_Fc = this.RegistrationForm.get('city')
  street_Fc = this.RegistrationForm.get('street')

  // =========================================================

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password.pristine || confirmPassword.pristine) {
      return null
    }

    return password.value && confirmPassword.value && password.value != confirmPassword.value ?
      { 'noMatch': true } : null
  }

  citysArr: string[] = ['Ramat Gan', 'Tel Aviv', 'Rishon Lezion',
    'Netanya', 'Jerusalem', 'Beer Sheva', 'Dimona', 'Hadera', 'Ashdod', 'Ashkelon'
  ]

  step: number = 1;

  goBack(event) {
    event.preventDefault()
    this.step = 1
    
  };

  async IsFirstStepValid(body,e) {

    if (this.ID_Fc.valid && this.Email_Fc.valid && this.password_Fc.valid && this.confirmPassword_Fc.valid && !this.RegistrationForm.errors?.['noMatch']) {

      await this._data.R_register(body)
      console.log("first step is Valid")

      if (this._data.R_registerErrors == '') {
        this.step = 2
      }

    } else {
      console.log("first step in No NO NO NO NO")
      this.step = 1
    }

  }


}