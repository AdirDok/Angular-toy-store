import { Component, OnInit } from '@angular/core';
import { DataService } from './servises/data.service';
import { MainDataService } from './servises/main-data-.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public _data: DataService,
    public _mainData:MainDataService
  ) { }
  title = 'client';

  ngOnInit(): void {
    this._data.checkIfLoginOrNot()
    
  }


 

}



