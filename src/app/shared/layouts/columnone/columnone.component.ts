import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-columnone',
  templateUrl: './columnone.component.html',
  styleUrls: ['./columnone.component.css']
})
export class ColumnoneComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
