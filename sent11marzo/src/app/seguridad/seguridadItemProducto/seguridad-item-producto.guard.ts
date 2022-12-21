import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SeguridadItemProductoGuard implements CanActivate {
  constructor(private route: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.verificarIngreso()=="si"){
        return true;
      }else{
        this.route.navigate(['/']);
        return false;
      }
  }
  verificarIngreso(){

    var buscar:string[] = JSON.parse( localStorage.getItem('verificarGestionProducto')||'{}');
    var verificar = "";
    var seguir=0;
    if(buscar.length>=1){
      buscar.forEach(datos=>{

        if((datos=="Item Producto" || datos=="ADMIN")&&(seguir==0)){
          verificar="si";
          seguir=1;
        }else if(seguir==0){
          verificar="no";
        }
      })
    }
    console.log(verificar);
    return verificar;
  }
}
