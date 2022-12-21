import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-padre',
  templateUrl: './producto-padre.component.html',
  styleUrls: ['./producto-padre.component.css']
})
export class ProductoPadreComponent implements OnInit {

  constructor(matdialog:MatDialog) { }
  ngOnInit(): void {}
}
