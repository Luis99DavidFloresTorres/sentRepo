import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ModelItemProyecto } from 'src/app/Models/ItemProyecto.model';
import { ServiceItemProyecto } from 'src/app/services/itemProyecto.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
@Component({
  selector: 'app-arbol-proyectos',
  templateUrl: './arbol-proyectos.component.html',
  styleUrls: ['./arbol-proyectos.component.css']
})
export class ArbolProyectosComponent implements OnInit {

  treeControl = new NestedTreeControl<ModelItemProyecto>(node => node.proyectoTablaHijos.itemProyectos);
  dataSource = new MatTreeNestedDataSource<ModelItemProyecto>();

  constructor(private serviceItemProyecto:ServiceItemProyecto) {


  }


  hasChild = (_: number, node: ModelItemProyecto) => !!node.proyectoTablaHijos.itemProyectos && node.proyectoTablaHijos.itemProyectos.length > 0;
  ngOnInit(): void {
    this.serviceItemProyecto.obtenerByProyecto(4888);
    this.serviceItemProyecto.listenerByProyecto().subscribe(datos=>{
      this.dataSource.data = datos;
    })
  }
}
