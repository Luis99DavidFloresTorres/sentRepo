import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadProyectoCotzGuard implements CanActivate {
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
    var seguir = 0;
    if(buscar.length>=1){
      buscar.forEach(datos=>{
        if((datos=="COTIZACION CLIENTE" || datos=="ADMIN")&&(seguir==0)){
          verificar="si";
          seguir = 1;
        }else if(seguir==0){
          verificar="no";
        }
      })
    }
    return verificar;
  }

}
