import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servises/data.service';
import { MainDataService } from 'src/app/servises/main-data-.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public _data: DataService,
    public _mainData: MainDataService
  ) { }

  ngOnInit(): void {
    this._data.checkIfLoginOrNot()
    this._data.redirectToMain()
  }



}
