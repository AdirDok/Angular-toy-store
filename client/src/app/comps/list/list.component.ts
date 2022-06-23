import { Component, OnInit } from '@angular/core';
import { MainDataService } from 'src/app/servises/main-data-.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public _mainData: MainDataService
  ) { }

  ngOnInit(): void {
    this._mainData.getAllCategories()
    this._mainData.getAllProducts()

  }



}
